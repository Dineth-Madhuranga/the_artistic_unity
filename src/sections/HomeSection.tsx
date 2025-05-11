"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const HomeSection = () => {
  // Image slider for frames section
  const frameImages = [
    "https://i.postimg.cc/j5X8rb2K/2.png",
    "https://i.postimg.cc/zBpVg1Sd/12.png",
    "https://i.postimg.cc/X7yVCDFc/26.png",
  ]

  // Image slider for collages section
  const collageImages = [
    "https://i.postimg.cc/cJvYH2mL/10x12-2.jpg",
    "https://i.postimg.cc/9Fzcv2F0/Grey-and-Blue-Y2k-Collage-Influencer-Blog-About-Me-Facts-Instagram-Post-12-x-18-in-10-x-12-in.jpg",
    "https://i.postimg.cc/jd9RT1LX/My-sweet-little-girl-You-have-made-us-proud-in-every-way-possible-Happy-Birthday-Honey-18-x-12.jpg",
    "https://i.postimg.cc/htPVFfQx/Pink-Grey-Creative-Feminine-Fashion-Quote-Instagram-Post-18-x-12-in-18-x-12-in-12-x-10-in-10.jpg",
  ]

  // Material images
  const materialImages = [
    "https://i.postimg.cc/pLKss98H/2.png",
    "https://i.postimg.cc/Prg6bbCy/3.png",
    "https://i.postimg.cc/g0dNQYq6/5.png",
  ]

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [currentCollageIndex, setCurrentCollageIndex] = useState(0)
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left

  // Auto slider effect for frames
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrameIndex((prevIndex) => (prevIndex === frameImages.length - 1 ? 0 : prevIndex + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [frameImages.length])

  // Auto slider effect for materials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMaterialIndex((prevIndex) => (prevIndex === materialImages.length - 1 ? 0 : prevIndex + 1))
    }, 3500)

    return () => clearInterval(interval)
  }, [materialImages.length])

  // Auto slider effect for collages - slow horizontal slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCollageIndex((prevIndex) => {
        if (prevIndex === collageImages.length - 1) {
          return 0
        }
        return prevIndex + 1
      })
    }, 5000) // Slower transition (5 seconds per image)

    return () => clearInterval(interval)
  }, [collageImages.length])

  const nextCollageImage = () => {
    setDirection(1)
    setCurrentCollageIndex((prevIndex) => (prevIndex === collageImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevCollageImage = () => {
    setDirection(-1)
    setCurrentCollageIndex((prevIndex) => (prevIndex === 0 ? collageImages.length - 1 : prevIndex - 1))
  }

  // Variants for horizontal slide animation
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div>
      {/* SECTION 1: Logo Cover with White Background - UPDATED */}
      <section className="min-h-[60vh] md:min-h-[70vh] relative overflow-hidden flex items-center justify-center bg-white">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md px-4 py-8">
          <img
            src="https://i.postimg.cc/h4bxZ9ZM/Black-White-Minimalist-Initials-Monogram-Jewelry-Logo-removebg-preview.png"
            alt="The Artistic Unity Logo"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* SECTION 2: We Are - UPDATED (No Animation) */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">We are,</h2>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                A group of entrepreneurs "The Artistic Unity". We wish to touch the sky with the effort of providing a
                satisfactory service to our customers through hard work and innovation.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src="https://i.postimg.cc/0jynQbMT/3.png" alt="About Us" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Our Products - UPDATED (White Background) */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 italic">Our Products</h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                We at The Artistic Unity offer a wide range of framing solutions and collage designs. Our products are
                crafted with precision and care to bring your memories to life in the most elegant way.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px] overflow-hidden">
              {frameImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: currentFrameIndex === index ? 1 : 0,
                    scale: currentFrameIndex === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Frame Product ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              ))}

              {/* Navigation Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {frameImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFrameIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${currentFrameIndex === index ? "bg-gray-800 w-4" : "bg-gray-400"
                      }`}
                    aria-label={`Go to frame slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: We Appreciate Premium Materials - UPDATED (White Background) */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="relative h-[300px] md:h-[400px] overflow-hidden order-2 md:order-1">
              {materialImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: currentMaterialIndex === index ? 1 : 0,
                    scale: currentMaterialIndex === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Premium Material ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              ))}

              {/* Navigation Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {materialImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMaterialIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${currentMaterialIndex === index ? "bg-gray-800 w-4" : "bg-gray-400"
                      }`}
                    aria-label={`Go to material slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 italic">
                We Appreciate <span className="text-amber-800">premium materials.</span>
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                We have imported the finest materials from around the world to ensure that our frames not only look
                beautiful but also stand the test of time. Our commitment to quality is evident in every piece we
                create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Select from multiple collage designs - UPDATED */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center italic">
            Select from multiple <span className="text-indigo-600">collage designs</span>
          </h2>

          <div className="relative overflow-hidden">
            {/* Horizontal Slider Container */}
            <div className="relative w-full overflow-hidden" style={{ height: "450px" }}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentCollageIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "tween", duration: 1.2, ease: "easeInOut" },
                    opacity: { duration: 0.8 },
                  }}
                  className="absolute w-full flex justify-center"
                >
                  <div className="w-[90%] max-w-md rounded-lg overflow-hidden shadow-md border border-gray-200">
                    <img
                      src={collageImages[currentCollageIndex] || "/placeholder.svg"}
                      alt={`Collage design ${currentCollageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {collageImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentCollageIndex ? 1 : -1)
                      setCurrentCollageIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${currentCollageIndex === index ? "bg-indigo-600 w-4" : "bg-indigo-300"
                      }`}
                    aria-label={`Go to collage ${index + 1}`}
                  />
                ))}
              </div>

              {/* Left/Right Navigation Arrows */}
              <button
                onClick={prevCollageImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-10"
                aria-label="Previous collage"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextCollageImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-10"
                aria-label="Next collage"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/collages"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                View All Designs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeSection
