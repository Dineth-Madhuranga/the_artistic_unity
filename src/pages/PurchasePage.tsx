"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Check, ShoppingCart, ArrowLeft, X, ChevronRight, ChevronLeft, ImageIcon } from "lucide-react"
import { submitOrder } from "../utils/api"
import toast from "react-hot-toast"

const PurchasePage = () => {
  const { frameId } = useParams()
  const navigate = useNavigate()

  // Update the selectedSize state to use the first collage size by default
  const [selectedSize, setSelectedSize] = useState("6x8")
  const [quantity, setQuantity] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    whatsapp: "",
    requests: "",
  })
  const [previewImage, setPreviewImage] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [frameNotFound, setFrameNotFound] = useState(false)

  // Collage Gallery States
  const [collageSize, setCollageSize] = useState(null)
  const [collageCategory, setCollageCategory] = useState(null)
  const [orientation, setOrientation] = useState("portrait") // Default to portrait
  const [lightboxImage, setLightboxImage] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Add a state for special size selection
  const [specialSizeSelected, setSpecialSizeSelected] = useState(false)

  // Collage data with sizes available in both orientations
  const collageSizes = [
    { size: "6x8", price: 2500 },
    { size: "8x6", price: 2500 }, // Landscape version
    { size: "8x10", price: 3000 },
    { size: "10x8", price: 3000 }, // Landscape version
    { size: "8x12", price: 3400 },
    { size: "12x8", price: 3400 }, // Landscape version
    { size: "10x12", price: 3400 },
    { size: "12x10", price: 3400 }, // Landscape version
    { size: "10x15", price: 4000 },
    { size: "15x10", price: 4000 }, // Landscape version
    { size: "12x15", price: 4000 },
    { size: "15x12", price: 4000 }, // Landscape version
    { size: "12x18", price: 4300 },
    { size: "18x12", price: 4300 }, // Landscape version
    { size: "16x24", price: 8500 },
    { size: "24x16", price: 8500 }, // Landscape version
    { size: "20x30", price: 11500 },
    { size: "30x20", price: 11500 }, // Landscape version
  ]

  // Helper function to determine if a size is portrait or landscape
  const getSizeOrientation = (size) => {
    const [width, height] = size.split("x").map(Number)
    return width < height ? "portrait" : "landscape"
  }

  // Filter sizes by orientation
  const getFilteredSizes = () => {
    return collageSizes.filter((item) => getSizeOrientation(item.size) === orientation)
  }

  const collageCategories = ["Artistic collages", "Minimalistic collages", "Shape inspired collages"]

  // Collage Images - organized by size and category
  const collageImages = {
    // Portrait sizes
    "6x8": {
      "Artistic collages": [
        "https://i.postimg.cc/d08wCmtM/10-x-12.jpg",
        "https://i.postimg.cc/G2drx8H4/10x12.jpg",
        "https://i.postimg.cc/mrxTh64N/10x12n.jpg",
        "https://i.postimg.cc/k4sC1Jbf/Happy-Birthday-Facebook-Post-18-x-12-in-12-x-10-in-10-x-12-in-2.jpg",
      ],
      "Minimalistic collages": [
        "https://i.postimg.cc/BQdrCLzJ/10x12-2.jpg",
        "https://i.postimg.cc/mgC0pZxC/Grey-and-Blue-Y2k-Collage-Influencer-Blog-About-Me-Facts-Instagram-Post-12-x-18-in-10-x-12-in.jpg",
        "https://i.postimg.cc/FKvwMtmq/My-sweet-little-girl.jpg",
        "https://i.postimg.cc/kX6r8Ffj/Pink-Grey-Creative.jpg",
      ],
      "Shape inspired collages": [
        "https://i.postimg.cc/0jhBZFcV/Red-Collage-Wedding.jpg",
        "https://i.postimg.cc/Kj1WPxrK/Untitled-10-x-12-in.jpg",
        "https://i.postimg.cc/xd9FsK3V/Untitled-12-x-18-in.jpg",
        "https://i.postimg.cc/rwXH46dm/Untitled-collage.jpg",
      ],
    },
    "8x6": {
      // Landscape version
      "Artistic collages": [
        "https://i.postimg.cc/J7ymcLhc/12-x10.jpg",
        "https://i.postimg.cc/c4wS2Bwv/12x10.jpg",
        "https://i.postimg.cc/dDM5GdVX/12x10-n.jpg",
        "https://i.postimg.cc/MZhw9FMk/Happy-Birthday.jpg",
      ],
      "Minimalistic collages": [
        "https://i.postimg.cc/Cx0ggnsm/12x10.jpg",
        "https://i.postimg.cc/q7MHtfYK/Y2k-Collage.jpg",
        "https://i.postimg.cc/vmqFfqFN/My-sweet-little-girl.jpg",
        "https://i.postimg.cc/W17Pbp9j/Pink-Grey-Creative.jpg",
      ],
      "Shape inspired collages": [
        "https://i.postimg.cc/sXqk0M2P/Red-Collage-Wedding.jpg",
        "https://i.postimg.cc/V6JyRqzL/Untitled-collage.jpg",
        "https://i.postimg.cc/66GJ4fHM/Untitled-shape.jpg",
        "https://i.postimg.cc/J0XfwRyf/Untitled-multi.jpg",
      ],
    },
    "8x10": {
      "Artistic collages": [
        "https://i.postimg.cc/J7ymcLhc/12-x10.jpg",
        "https://i.postimg.cc/c4wS2Bwv/12x10.jpg",
        "https://i.postimg.cc/dDM5GdVX/12x10-n.jpg",
        "https://i.postimg.cc/MZhw9FMk/Happy-Birthday.jpg",
      ],
      "Minimalistic collages": [
        "https://i.postimg.cc/Cx0ggnsm/12x10.jpg",
        "https://i.postimg.cc/q7MHtfYK/Y2k-Collage.jpg",
        "https://i.postimg.cc/vmqFfqFN/My-sweet-little-girl.jpg",
        "https://i.postimg.cc/W17Pbp9j/Pink-Grey-Creative.jpg",
      ],
      "Shape inspired collages": [
        "https://i.postimg.cc/sXqk0M2P/Red-Collage-Wedding.jpg",
        "https://i.postimg.cc/V6JyRqzL/Untitled-collage.jpg",
        "https://i.postimg.cc/66GJ4fHM/Untitled-shape.jpg",
        "https://i.postimg.cc/J0XfwRyf/Untitled-multi.jpg",
      ],
    },
    "10x8": {
      // Landscape version
      "Artistic collages": [
        "https://i.postimg.cc/4ypSLwqZ/12-x-18.jpg",
        "https://i.postimg.cc/TYXSLM5P/12x18.png",
        "https://i.postimg.cc/Kz6WDC9J/12x18-n.jpg",
        "https://i.postimg.cc/XN5mY7Jh/Happy-Birthday.jpg",
      ],
      "Minimalistic collages": [
        "https://i.postimg.cc/4xfSP65k/12x18.jpg",
        "https://i.postimg.cc/DwxYMSjW/Y2k-Collage.jpg",
        "https://i.postimg.cc/XvXDSnms/My-sweet-little-girl.jpg",
        "https://i.postimg.cc/KvrWtqtD/Pink-Grey-Creative.jpg",
      ],
      "Shape inspired collages": [
        "https://i.postimg.cc/XqKscqBY/Red-Collage-Wedding.jpg",
        "https://i.postimg.cc/Prh3fW0p/Untitled.jpg",
        "https://i.postimg.cc/FHHT39rh/Untitled-inspire.jpg",
        "https://i.postimg.cc/FF0CQWCX/Untitled-design-3.jpg",
      ],
    },
    "8x12": {
      "Artistic collages": [
        "https://i.postimg.cc/4ypSLwqZ/12-x-18.jpg",
        "https://i.postimg.cc/TYXSLM5P/12x18.png",
        "https://i.postimg.cc/Kz6WDC9J/12x18-n.jpg",
        "https://i.postimg.cc/XN5mY7Jh/Happy-Birthday.jpg",
      ],
      "Minimalistic collages": [
        "https://i.postimg.cc/4xfSP65k/12x18.jpg",
        "https://i.postimg.cc/DwxYMSjW/Y2k-Collage.jpg",
        "https://i.postimg.cc/XvXDSnms/My-sweet-little-girl.jpg",
        "https://i.postimg.cc/KvrWtqtD/Pink-Grey-Creative.jpg",
      ],
      "Shape inspired collages": [
        "https://i.postimg.cc/XqKscqBY/Red-Collage-Wedding.jpg",
        "https://i.postimg.cc/Prh3fW0p/Untitled.jpg",
        "https://i.postimg.cc/FHHT39rh/Untitled-inspire.jpg",
        "https://i.postimg.cc/FF0CQWCX/Untitled-design-3.jpg",
      ],
    },
    "12x8": {
      // Landscape version
      "Artistic collages": [
        "https://i.postimg.cc/8CBsGVvr/18-x-12.jpg",
        "https://i.postimg.cc/YCFhXFqR/18x12.jpg",
        "https://i.postimg.cc/tCwstky7/18x12n.jpg",
        "https://i.postimg.cc/nz3zsY0F/Happy-Birthday.jpg",
      ],
      "Minimalistic collages": [
        "https://i.postimg.cc/NjRj8wpP/18x12.jpg",
        "https://i.postimg.cc/X7RvyvcC/Y2k-Collage.jpg",
        "https://i.postimg.cc/MGDZ4mk7/My-sweet-little-girl.jpg",
        "https://i.postimg.cc/hGgPp3Y4/Pink-Grey-Creative.jpg",
      ],
      "Shape inspired collages": [
        "https://i.postimg.cc/W1msFw1B/1.jpg",
        "https://i.postimg.cc/rmHTXhfr/2.jpg",
        "https://i.postimg.cc/nrQJHvWw/3.jpg",
        "https://i.postimg.cc/zfJ8nHLV/4.jpg",
      ],
    },
    "12x18": {
      "Artistic collages": [
        "https://i.postimg.cc/8CBsGVvr/18-x-12.jpg",
        "https://i.postimg.cc/YCFhXFqR/18x12.jpg",
        "https://i.postimg.cc/tCwstky7/18x12n.jpg",
        "https://i.postimg.cc/nz3zsY0F/Happy-Birthday.jpg",
      ],
      "Minimalistic collages": [
        "https://i.postimg.cc/NjRj8wpP/18x12.jpg",
        "https://i.postimg.cc/X7RvyvcC/Y2k-Collage.jpg",
        "https://i.postimg.cc/MGDZ4mk7/My-sweet-little-girl.jpg",
        "https://i.postimg.cc/hGgPp3Y4/Pink-Grey-Creative.jpg",
      ],
      "Shape inspired collages": [
        "https://i.postimg.cc/W1msFw1B/1.jpg",
        "https://i.postimg.cc/rmHTXhfr/2.jpg",
        "https://i.postimg.cc/nrQJHvWw/3.jpg",
        "https://i.postimg.cc/zfJ8nHLV/4.jpg",
      ],
    },
    "18x12": {
      // Landscape version
      "Artistic collages": [
        "https://i.postimg.cc/d08wCmtM/10-x-12.jpg",
        "https://i.postimg.cc/G2drx8H4/10x12.jpg",
        "https://i.postimg.cc/mrxTh64N/10x12n.jpg",
        "https://i.postimg.cc/k4sC1Jbf/Happy-Birthday-Facebook-Post-18-x-12-in-12-x-10-in-10-x-12-in-2.jpg",
      ],
      "Minimalistic collages": [
        "https://i.postimg.cc/BQdrCLzJ/10x12-2.jpg",
        "https://i.postimg.cc/mgC0pZxC/Grey-and-Blue-Y2k-Collage-Influencer-Blog-About-Me-Facts-Instagram-Post-12-x-18-in-10-x-12-in.jpg",
        "https://i.postimg.cc/FKvwMtmq/My-sweet-little-girl.jpg",
        "https://i.postimg.cc/kX6r8Ffj/Pink-Grey-Creative.jpg",
      ],
      "Shape inspired collages": [
        "https://i.postimg.cc/0jhBZFcV/Red-Collage-Wedding.jpg",
        "https://i.postimg.cc/Kj1WPxrK/Untitled-10-x-12-in.jpg",
        "https://i.postimg.cc/xd9FsK3V/Untitled-12-x-18-in.jpg",
        "https://i.postimg.cc/rwXH46dm/Untitled-collage.jpg",
      ],
    },
    // Add more sizes as needed with their respective images
  }

  // Function to get images for a size, with fallbacks
  const getCollageImages = (size, category) => {
    // If images exist for this size and category, return them
    if (collageImages[size] && collageImages[size][category]) {
      return collageImages[size][category]
    }

    // Otherwise, check if we can use the equivalent orientation size
    const sizeOrientation = getSizeOrientation(size)

    // Find a fallback size with the same orientation that has images
    const fallbackSize = Object.keys(collageImages).find((s) => {
      return getSizeOrientation(s) === sizeOrientation && collageImages[s] && collageImages[s][category]
    })

    if (fallbackSize) {
      return collageImages[fallbackSize][category]
    }

    // Last resort: return some default placeholder images
    return [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ]
  }

  // Handle lightbox navigation
  const handleLightboxNavigation = (direction) => {
    if (!collageCategory || !collageSize) return

    const images = getCollageImages(collageSize, collageCategory)
    let newIndex = lightboxIndex

    if (direction === "next") {
      newIndex = (lightboxIndex + 1) % images.length
    } else {
      newIndex = (lightboxIndex - 1 + images.length) % images.length
    }

    setLightboxIndex(newIndex)
    setLightboxImage(images[newIndex])
  }

  // All available frames with updated prices in LKR
  const frames = [
    {
      id: "103",
      name: "Mount Frame",
      category: "General",
      image: "https://i.postimg.cc/sXyn8XVw/1.png",
      images: [
        "https://i.postimg.cc/sXyn8XVw/1.png",
        "https://i.postimg.cc/j5X8rb2K/2.png",
        "https://i.postimg.cc/63wRw444/4.png",
        "https://i.postimg.cc/Gh3WtMnq/5.png",
      ],
      prices: {
        "6x8": 1300,
        "8x6": 1300,
        "8x10": 2000,
        "10x8": 2000,
        "8x12": 2500,
        "12x8": 2500,
        "10x12": 3000,
        "12x10": 3000,
        "10x15": 3400,
        "15x10": 3400,
        "12x15": 4000,
        "15x12": 4000,
        "12x18": 4300,
        "18x12": 4300,
        "16x24": 8500,
        "24x16": 8500,
        "20x30": 11500,
        "30x20": 11500,
      },
      description:
        "A sleek general-style frame designed for clean, modern spaces. Ideal for showcasing minimalist artwork or photography.",
    },
    {
      id: "102",
      name: "Glass Frame",
      category: "General",
      image: "https://i.postimg.cc/t4ZFzjHJ/7.png",
      images: [
        "https://i.postimg.cc/t4ZFzjHJ/7.png",
        "https://i.postimg.cc/cJf9XYNv/8.png",
        "https://i.postimg.cc/zfTW9Fv1/9.png",
        "https://i.postimg.cc/kGYtxj1W/Untitled-12-x-18-in-12-x-16-in.png",
      ],
      prices: {
        "6x8": 1300,
        "8x6": 1300,
        "8x10": 2000,
        "10x8": 2000,
        "8x12": 2500,
        "12x8": 2500,
        "10x12": 3000,
        "12x10": 3000,
        "10x15": 3400,
        "15x10": 3400,
        "12x15": 4000,
        "15x12": 4000,
        "12x18": 4300,
        "18x12": 4300,
        "16x24": 8500,
        "24x16": 8500,
        "20x30": 11500,
        "30x20": 11500,
      },
      description:
        "The glass front adds a polished look while protecting your artwork or photo. Ideal for those seeking a traditional yet refined style.",
    },
    {
      id: "202",
      name: "Plymount Frame",
      category: "Borderless",
      image: "https://i.postimg.cc/jj0wVcSh/11.png",
      images: [
        "https://i.postimg.cc/jj0wVcSh/11.png",
        "https://i.postimg.cc/zBpVg1Sd/12.png",
        "https://i.postimg.cc/6Qr7BZ7x/13.png",
        "https://i.postimg.cc/dVTkSpw1/15.png",
      ],
      prices: {
        "6x8": 1000,
        "8x6": 1000,
        "8x10": 1900,
        "10x8": 1900,
        "8x12": 2250,
        "12x8": 2250,
        "10x12": 2500,
        "12x10": 2500,
        "10x15": 3100,
        "15x10": 3100,
        "12x15": 3500,
        "15x12": 3500,
        "12x18": 3800,
        "18x12": 3800,
        "16x24": 7900,
        "24x16": 7900,
        "20x30": 9000,
        "30x20": 9000,
      },
      description:
        "This plymount frame blends subtle edges and a borderless feel for a timeless look that enhances any print.",
    },
    {
      id: "203",
      name: "Embossed Frame",
      category: "Borderless",
      image: "https://i.postimg.cc/d3kwVMWZ/16.png",
      images: [
        "https://i.postimg.cc/d3kwVMWZ/16.png",
        "https://i.postimg.cc/vmhQPtgT/17.png",
        "https://i.postimg.cc/QdLxVtZ8/18.png",
        "https://i.postimg.cc/1zrzkZT9/19.png",
        "https://i.postimg.cc/jjb53jMg/20.png",
      ],
      prices: {
        "6x8": 1300,
        "8x6": 1300,
        "8x10": 2000,
        "10x8": 2000,
        "8x12": 2500,
        "12x8": 2500,
        "10x12": 3000,
        "12x10": 3000,
        "10x15": 3400,
        "15x10": 3400,
        "12x15": 4000,
        "15x12": 4000,
        "12x18": 4300,
        "18x12": 4300,
        "16x24": 8500,
        "24x16": 8500,
        "20x30": 11000,
        "30x20": 11000,
        Special: 2500, // Special size option
      },
      description:
        "A classy embossed frame featuring soft textures and a seamless profile. Great for family photos or art prints.",
      hasSpecialSize: true,
    },
    {
      id: "204",
      name: "Compound Frame",
      category: "Borderless",
      image: "https://i.postimg.cc/L4YJsGgV/22.png",
      images: [
        "https://i.postimg.cc/L4YJsGgV/22.png",
        "https://i.postimg.cc/L4cngvzF/23.png",
        "https://i.postimg.cc/c4f6RYmg/24.png",
      ],
      prices: {
        "10x15": 6000,
        "15x10": 6000,
        "12x18": 7500,
        "18x12": 7500,
        "16x24": 9000,
        "24x16": 9000,
        "20x30": 11000,
        "30x20": 11000,
      },
      description:
        "This compound frame features layered design elements for added depth while maintaining a clean, frameless aesthetic.",
    },
    {
      id: "301",
      name: "Rotating Frame",
      category: "Modern",
      image: "https://i.postimg.cc/8Cc10rhb/32.png",
      images: [
        "https://i.postimg.cc/8Cc10rhb/32.png",
        "https://i.postimg.cc/6pwfsC5n/30.png",
        "https://i.postimg.cc/BnkHCzwS/31.png",
      ],
      prices: {
        "6x8": 2500,
        "8x6": 2500,




      },
      description: "An innovative rotating frame that adds motion and uniqueness to any piece. Ideal for modern, dynamic interiors.",
    },
    {
      id: "302",
      name: "Floating Frame",
      category: "Modern",
      image: "https://i.postimg.cc/DwrnCJxS/25.png",
      images: [
        "https://i.postimg.cc/DwrnCJxS/25.png",
        "https://i.postimg.cc/X7yVCDFc/26.png",
        "https://i.postimg.cc/7Znb5W8t/27.png",
        "https://i.postimg.cc/g2WnkP56/28.png",
        "https://i.postimg.cc/FH5hggVt/29.png",
      ],
      prices: {
        "6x8": 2300,
        "8x6": 2300,
        "8x12": 2500,
        "12x8": 2500,
      },
      description:
        "Designed to give the illusion of art suspended in air, this floating frame offers a bold and elegant presentation.",
    },
  ]

  // Find the selected frame data
  const selectedFrameData = frames.find((frame) => frame.id === frameId)

  // Add a function to check if the frame has a special size option
  const hasSpecialSize = () => {
    return selectedFrameData?.hasSpecialSize || false
  }

  // Update the getAvailableSizes function to handle special sizes
  const getAvailableSizes = () => {
    if (!selectedFrameData) return []

    const sizes = Object.keys(selectedFrameData.prices)
      .filter((size) => size !== "Special") // Filter out the special size for normal listing
      .map((size) => {
        return {
          size,
          price: selectedFrameData.prices[size],
        }
      })

    return sizes
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        customerWhatsapp: formData.whatsapp,
        customerRequests: formData.requests,
        frame: selectedFrameData,
        size: selectedSize,
        quantity,
        // Format the collage category for email inclusion
        collageCategory: collageCategory || "Not selected",
        collageDetails: {
          size: selectedSize,
          isSpecialSize: selectedSize === "Special",
          category: collageCategory || "Not selected",
          orientation: orientation,
          // Include additional details that might be useful for the email
          price:
            selectedSize === "Special"
              ? selectedFrameData?.prices["Special"]
              : selectedFrameData?.prices[selectedSize] || 0,
        },
        totalPrice: calculateTotal(),
      }

      // Note: The collageCategory and collageDetails fields should be included in the email template
      // to ensure the customer receives complete information about their order

      await submitOrder(orderData)
      setFormSubmitted(true)
      toast.success("Order submitted successfully! Check your email for confirmation.")
    } catch (error) {
      console.error("Error submitting order:", error)
      toast.error("Failed to submit order. Please try again.")
    }
  }

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedFrameData) return "0"

    // Get the price for the selected size
    let price = 0
    if (selectedSize === "Special") {
      price = selectedFrameData.prices["Special"] || 0
    } else {
      price = selectedFrameData.prices[selectedSize] || 0
    }

    return (price * quantity).toFixed(0)
  }

  // If frame not found, redirect to home
  useEffect(() => {
    if (!selectedFrameData) {
      setFrameNotFound(true)
      navigate("/")
    } else {
      setFrameNotFound(false)

      // Set default size to the first available size for this frame
      const availableSizes = Object.keys(selectedFrameData.prices)
      if (availableSizes.length > 0) {
        setSelectedSize(availableSizes[0])
      }
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    if (selectedFrameData && selectedFrameData.images.length > 0 && isMounted) {
      setPreviewImage(selectedFrameData.images[0])
    }

    return () => {
      isMounted = false
    }
  }, [])

  // Update collageSize when orientation changes
  useEffect(() => {
    // Find the first size that matches the selected orientation
    const filteredSizes = getFilteredSizes()
    if (filteredSizes.length > 0) {
      setCollageSize(filteredSizes[0].size)
      setSelectedSize(filteredSizes[0].size)
    }
  }, [orientation])

  // Add this useEffect after the other useEffect hooks
  useEffect(() => {
    if (collageCategory) {
      // When a category is selected, ensure it's reflected in the order summary
      setFormData((prev) => ({
        ...prev,
        collageCategory: collageCategory,
      }))
    }
  }, [collageCategory])

  if (frameNotFound) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to browsing
        </button>

        {/* Beautiful Collage Gallery Section */}
        <div className="mb-16 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2 text-center">Collage Gallery</h2>
            <p className="text-center text-white opacity-90 max-w-2xl mx-auto">
              Create stunning memories with our premium collage frames. Select your preferred size, style, and design to
              find the perfect collage for your space.
            </p>
          </div>

          <div className="p-8">
            {/* Step 1: Orientation Selection */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-indigo-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                  1
                </span>
                Select Orientation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                <div
                  className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${orientation === "portrait"
                    ? "border-indigo-600 bg-indigo-50 scale-105"
                    : "border-gray-200 hover:border-indigo-300"
                    }`}
                  onClick={() => setOrientation("portrait")}
                >
                  <div className="flex justify-center mb-2">
                    <div className="w-16 h-24 border-2 border-gray-300 flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-gray-400" />
                    </div>
                  </div>
                  <div className="font-medium">Portrait</div>
                </div>
                <div
                  className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${orientation === "landscape"
                    ? "border-indigo-600 bg-indigo-50 scale-105"
                    : "border-gray-200 hover:border-indigo-300"
                    }`}
                  onClick={() => setOrientation("landscape")}
                >
                  <div className="flex justify-center mb-2">
                    <div className="w-24 h-16 border-2 border-gray-300 flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-gray-400" />
                    </div>
                  </div>
                  <div className="font-medium">Landscape</div>
                </div>
              </div>
            </div>

            {/* Step 2: Size & Price Selection */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-indigo-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                  2
                </span>
                Select Size & Price
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {getAvailableSizes()
                  .filter((item) => getSizeOrientation(item.size) === orientation)
                  .map((item) => (
                    <div
                      key={item.size}
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${selectedSize === item.size && !specialSizeSelected
                        ? "border-indigo-600 bg-indigo-50 scale-105"
                        : "border-gray-200 hover:border-indigo-300"
                        }`}
                      onClick={() => {
                        setCollageSize(item.size)
                        setSelectedSize(item.size) // Update selectedSize when a size is selected
                        setSpecialSizeSelected(false) // Reset special size selection
                      }}
                    >
                      <div className="font-medium mb-2">{item.size} inches</div>
                      <div className="text-indigo-600 font-bold">LKR {item.price.toLocaleString()}</div>
                    </div>
                  ))}

                {/* Special Size Option for Compound Frame */}
                {hasSpecialSize() && (
                  <div
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${specialSizeSelected
                      ? "border-indigo-600 bg-indigo-50 scale-105"
                      : "border-gray-200 hover:border-indigo-300"
                      }`}
                    onClick={() => {
                      setSpecialSizeSelected(true)
                      setSelectedSize("Special") // Set the size to Special
                    }}
                  >
                    <div className="font-medium mb-2">Special Size</div>
                    <div className="text-indigo-600 font-bold">
                      LKR {selectedFrameData?.prices["Special"]?.toLocaleString() || "0"}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Collage Category (only shown after size is selected) */}
            {collageSize && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-indigo-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                    3
                  </span>
                  Choose Collage Category
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {collageCategories.map((category) => (
                    <div
                      key={category}
                      className={`border rounded-lg p-6 text-center cursor-pointer transition-all ${collageCategory === category
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                        }`}
                      onClick={() => setCollageCategory(category)}
                    >
                      <div className="font-medium">{category}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Gallery Images (only shown after category is selected) */}
            {collageSize && collageCategory && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-indigo-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                    4
                  </span>
                  Browse {collageCategory} ({collageSize})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {getCollageImages(collageSize, collageCategory).map((image, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
                      onClick={() => {
                        setLightboxImage(image)
                        setLightboxIndex(index)
                      }}
                    >
                      <div className="aspect-w-1 aspect-h-1">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${collageCategory} ${index + 1}`}
                          className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          Click to preview
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">{selectedFrameData?.name}</h1>
        <p className="text-gray-600 mb-8">{selectedFrameData?.description}</p>

        {!formSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Frame Preview - Updated with gradient background */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Updated preview section with gradient */}
                <div className="bg-gradient-to-br from-pink-200 via-blue-200 to-teal-200 p-6 rounded-t-lg">
                  <h2 className="text-2xl font-bold text-center mb-6 uppercase">{selectedFrameData?.category} FRAME</h2>

                  {/* Large preview image */}
                  <div className="flex justify-center mb-8">
                    <div className="w-64 h-80 bg-white p-2 rounded-lg shadow-md">
                      <img
                        src={previewImage || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Frame name */}
                  <h3 className="text-xl font-semibold text-center mb-6">{selectedFrameData?.name}</h3>

                  {/* Thumbnail images */}
                  <div className="flex justify-center flex-wrap gap-4 mb-6">
                    {selectedFrameData?.images.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => setPreviewImage(img)}
                        className={`w-16 h-16 bg-white p-1 rounded-md shadow-md cursor-pointer transition-all duration-200 ${previewImage === img ? "ring-2 ring-indigo-500 scale-110" : "hover:scale-105"
                          }`}
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`${selectedFrameData?.name} ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {/* Frame Details */}
                  <div>
                    <h2 className="text-xl font-bold mb-2">Frame Details</h2>
                    <p className="text-gray-600 mb-4">{selectedFrameData?.description}</p>
                    <div className="mb-4">
                      <span className="text-gray-700 font-medium">Category:</span> {selectedFrameData?.category}
                    </div>
                    <div className="mb-4">
                      <span className="text-gray-700 font-medium">Available Sizes:</span>
                      <ul className="list-disc list-inside ml-2 text-gray-600">
                        {getAvailableSizes().map((item) => (
                          <li key={item.size}>{item.size} inches</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-gray-700 font-medium">Material:</span> Premium quality materials
                    </div>
                  </div>
                </div>
              </div>

              {/* Size and Quantity Selection */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Choose Quantity</h2>

                  <div>
                    <label className="block text-gray-700 mb-2">Quantity</label>
                    <div className="flex items-center">
                      <button
                        className="border border-gray-300 rounded-l-md px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                        className="border-t border-b border-gray-300 px-4 py-2 w-16 text-center focus:outline-none"
                      />
                      <button
                        className="border border-gray-300 rounded-r-md px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={() => setQuantity((prev) => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                  <div className="flex items-center mb-4">
                    <img
                      src={selectedFrameData?.image || "/placeholder.svg"}
                      alt={selectedFrameData?.name}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{selectedFrameData?.name}</h3>
                      <p className="text-sm text-gray-500">{selectedFrameData?.category}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">
                        {selectedSize === "Special" ? "Special Custom Size" : `${selectedSize} inches`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Orientation:</span>
                      <span className="font-medium capitalize">{orientation}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{collageCategory || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">
                        LKR {selectedFrameData?.prices[selectedSize]?.toLocaleString() || "0"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="font-semibold text-indigo-600">LKR {calculateTotal()}</span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                    onClick={() => setShowForm(true)}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We will contact you shortly to confirm your purchase.
              </p>
              {/* Update the order confirmation details to show special size information */}
              <div className="bg-gray-50 p-4 rounded-md text-left mb-6">
                <h3 className="font-semibold mb-2">Order Details:</h3>
                <p>
                  <span className="text-gray-600">Frame:</span> {selectedFrameData?.name}
                </p>
                <p>
                  <span className="text-gray-600">Size:</span>{" "}
                  {selectedSize === "Special" ? "Special Custom Size" : `${selectedSize} inches`}
                </p>
                <p>
                  <span className="text-gray-600">Orientation:</span> <span className="capitalize">{orientation}</span>
                </p>
                <p>
                  <span className="text-gray-600">Category:</span> {collageCategory || "Not selected"}
                </p>
                <p>
                  <span className="text-gray-600">Quantity:</span> {quantity}
                </p>
                <p>
                  <span className="text-gray-600">Total:</span> LKR {calculateTotal()}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedSize("8x10")
                    setQuantity(1)
                    setShowForm(false)
                    setFormSubmitted(false)
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                >
                  Place Another Order
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-md transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Form */}
        {showForm && !formSubmitted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Complete Your Order</h2>
                <p className="text-gray-600 mb-6">Please provide your details for cash-on-delivery.</p>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Delivery Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">WhatsApp Number</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Same as phone number if applicable"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Any Special Requests</label>
                      <textarea
                        name="requests"
                        value={formData.requests}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        placeholder="Any special instructions or requests for your order"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox Modal for Collage Images */}
        {lightboxImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full">
              {/* Close button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-0 right-0 -mt-12 -mr-12 bg-white bg-opacity-20 rounded-full p-2 text-white hover:bg-opacity-40 transition-all z-50"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={() => handleLightboxNavigation("prev")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 bg-white bg-opacity-20 rounded-full p-2 text-white hover:bg-opacity-40 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={() => handleLightboxNavigation("next")}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 bg-white bg-opacity-20 rounded-full p-2 text-white hover:bg-opacity-40 transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image container */}
              <div className="bg-white p-2 rounded-lg shadow-2xl">
                <img
                  src={lightboxImage || "/placeholder.svg"}
                  alt="Collage Preview"
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>

              {/* Caption */}
              <div className="text-center text-white mt-4">
                <p className="text-lg font-medium">
                  {collageCategory} - {collageSize} inches
                </p>
                <p className="text-sm opacity-80">
                  Image {lightboxIndex + 1} of {collageImages[collageSize]?.[collageCategory]?.length || 0}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PurchasePage
