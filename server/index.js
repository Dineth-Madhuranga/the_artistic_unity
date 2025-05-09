import express from "express"
import nodemailer from "nodemailer"
import cors from "cors"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

// Initialize dotenv
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use an App Password if 2FA is enabled
  },
})

// Helper function to format special requests for HTML display
const formatSpecialRequests = (requests) => {
  if (!requests) return "None"
  // Replace new lines with HTML line breaks
  return requests.replace(/\n/g, "<br>")
}

// Order submission endpoint
app.post("/api/submit-order", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerWhatsapp, // New field for WhatsApp
      customerRequests, // New field for special requests
      frame,
      size,
      quantity,
      collageCategory,
      collageDetails,
      totalPrice,
    } = req.body

    // Format special size text
    const sizeText = size === "Special" ? "Special Custom Size" : `${size} inches`

    // Format currency
    const formattedPrice = `LKR ${Number(totalPrice).toLocaleString()}`

    // Format special requests for HTML display
    const formattedRequests = formatSpecialRequests(customerRequests)

    // Email content for owner
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: "New Frame Order Received - The Artistic Unity",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order Notification</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
              color: white;
              border-radius: 8px 8px 0 0;
              margin: -20px -20px 20px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .tagline {
              font-size: 14px;
              opacity: 0.8;
            }
            h2 {
              color: #6a11cb;
              border-bottom: 2px solid #f0f0f0;
              padding-bottom: 10px;
              margin-top: 30px;
            }
            .section {
              margin-bottom: 25px;
            }
            .detail-row {
              display: flex;
              margin-bottom: 8px;
              border-bottom: 1px solid #f0f0f0;
              padding-bottom: 8px;
            }
            .detail-label {
              font-weight: bold;
              width: 40%;
              color: #555;
            }
            .detail-value {
              width: 60%;
            }
            .price {
              font-size: 20px;
              color: #2575fc;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #999;
            }
            .highlight {
              background-color: #f8f4ff;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
            }
            .requests {
              background-color: #fff8e6;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
              border-left: 4px solid #ffc107;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">The Artistic Unity</div>
              <div class="tagline">Creating Beautiful Memories</div>
            </div>
            
            <h2>🎉 New Order Received!</h2>
            
            <div class="section">
              <h3>Customer Information</h3>
              <div class="detail-row">
                <div class="detail-label">Name:</div>
                <div class="detail-value">${customerName}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value">${customerEmail}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Phone:</div>
                <div class="detail-value">${customerPhone}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">WhatsApp:</div>
                <div class="detail-value">${customerWhatsapp || "Not provided"}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Address:</div>
                <div class="detail-value">${customerAddress}</div>
              </div>
            </div>
            
            <div class="section">
              <h3>Order Details</h3>
              <div class="highlight">
                <div class="detail-row">
                  <div class="detail-label">Frame:</div>
                  <div class="detail-value">${frame.name}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Frame Category:</div>
                  <div class="detail-value">${frame.category}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Size:</div>
                  <div class="detail-value">${sizeText}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Orientation:</div>
                  <div class="detail-value">${collageDetails?.orientation || "Not specified"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Collage Category:</div>
                  <div class="detail-value">${collageCategory || "Not selected"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Quantity:</div>
                  <div class="detail-value">${quantity}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Unit Price:</div>
                  <div class="detail-value">LKR ${(Number(totalPrice) / quantity).toLocaleString()}</div>
                </div>
              </div>
              
              <div class="detail-row" style="border-top: 2px solid #e0e0e0; margin-top: 15px; padding-top: 15px;">
                <div class="detail-label">Total Price:</div>
                <div class="detail-value price">${formattedPrice}</div>
              </div>
            </div>
            
            ${customerRequests
          ? `
            <div class="section">
              <h3>Special Requests</h3>
              <div class="requests">
                ${formattedRequests}
              </div>
            </div>
            `
          : ""
        }
            
            <div class="footer">
              <p>This is an automated notification from The Artistic Unity ordering system.</p>
              <p>© ${new Date().getFullYear()} The Artistic Unity. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    // Send email to owner
    await transporter.sendMail(mailOptions)

    // Send confirmation email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: "Your Order Confirmation - The Artistic Unity",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
              color: white;
              border-radius: 8px 8px 0 0;
              margin: -20px -20px 20px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .tagline {
              font-size: 14px;
              opacity: 0.8;
            }
            h2 {
              color: #6a11cb;
              border-bottom: 2px solid #f0f0f0;
              padding-bottom: 10px;
              margin-top: 30px;
            }
            .section {
              margin-bottom: 25px;
            }
            .detail-row {
              display: flex;
              margin-bottom: 8px;
              border-bottom: 1px solid #f0f0f0;
              padding-bottom: 8px;
            }
            .detail-label {
              font-weight: bold;
              width: 40%;
              color: #555;
            }
            .detail-value {
              width: 60%;
            }
            .price {
              font-size: 20px;
              color: #2575fc;
              font-weight: bold;
            }
            .message {
              background-color: #f0f7ff;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
              border-left: 4px solid #2575fc;
            }
            .highlight {
              background-color: #f8f4ff;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
            }
            .requests {
              background-color: #fff8e6;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
              border-left: 4px solid #ffc107;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #999;
            }
            .social {
              margin-top: 20px;
              text-align: center;
            }
            .social a {
              display: inline-block;
              margin: 0 10px;
              color: #6a11cb;
              text-decoration: none;
            }
            .whatsapp-button {
              background-color: #25D366;
              color: white;
              text-decoration: none;
              padding: 10px 15px;
              border-radius: 4px;
              display: inline-block;
              margin-top: 10px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">The Artistic Unity</div>
              <div class="tagline">Creating Beautiful Memories</div>
            </div>
            
            <h2>🎉 Thank You for Your Order!</h2>
            
            <div class="message">
              <p>Dear ${customerName},</p>
              <p>Thank you for choosing The Artistic Unity. We have received your order and are working on it with care and attention to detail.</p>
              <p>We will contact you shortly to confirm delivery details.</p>
            </div>
            
            <div class="section">
              <h3>Your Order Details</h3>
              <div class="highlight">
                <div class="detail-row">
                  <div class="detail-label">Frame:</div>
                  <div class="detail-value">${frame.name}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Frame Category:</div>
                  <div class="detail-value">${frame.category}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Size:</div>
                  <div class="detail-value">${sizeText}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Orientation:</div>
                  <div class="detail-value">${collageDetails?.orientation || "Not specified"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Collage Category:</div>
                  <div class="detail-value">${collageCategory || "Not selected"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Quantity:</div>
                  <div class="detail-value">${quantity}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Unit Price:</div>
                  <div class="detail-value">LKR ${(Number(totalPrice) / quantity).toLocaleString()}</div>
                </div>
              </div>
              
              <div class="detail-row" style="border-top: 2px solid #e0e0e0; margin-top: 15px; padding-top: 15px;">
                <div class="detail-label">Total Price:</div>
                <div class="detail-value price">${formattedPrice}</div>
              </div>
            </div>
            
            ${customerRequests
          ? `
            <div class="section">
              <h3>Your Special Requests</h3>
              <div class="requests">
                ${formattedRequests}
              </div>
            </div>
            `
          : ""
        }
            
            <div class="section">
              <h3>What's Next?</h3>
              <p>Our team will review your order and contact you within 24-48 hours to confirm the details and arrange delivery.</p>
              <p>If you have any questions about your order, please contact us at <a href="mailto:ashengamage238@gmail.com">ashengamage238@gmail.com</a> or call us at +94 712961268.</p>
              <p>You can also reach us on WhatsApp for faster responses:</p>
              <div style="text-align: center;">
                <a href="https://wa.me/94712961268" class="whatsapp-button">Contact Us on WhatsApp</a>
              </div>
            </div>
            
            <div class="social">
              <p>Follow us for updates and inspiration:</p>
              <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">Pinterest</a>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} The Artistic Unity. All rights reserved.</p>
              <p>Colombo, Sri Lanka</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await transporter.sendMail(customerMailOptions)

    res.status(200).json({ message: "Order submitted successfully" })
  } catch (error) {
    console.error("Error sending email:", error)
    res.status(500).json({ message: "Failed to submit order", error: error.message })
  }
})

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "../dist")))
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
