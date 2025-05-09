"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollReveal } from "../components/ui/scroll-reveal"

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

  // Material titles and descriptions
  const materialInfo = [
    {
      title: "Premium Wood",
      description: "Sustainably sourced hardwoods with rich grains and exceptional durability.",
    },
    {
      title: "Archival Matting",
      description: "Acid-free matting that preserves colors and prevents yellowing over time.",
    },
    {
      title: "Museum Glass",
      description: "Anti-reflective glass that provides UV protection while maintaining clarity.",
    },
  ]

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [currentCollageIndex, setCurrentCollageIndex] = useState(0)
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0)

  // Auto slider effect for frames
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrameIndex((prevIndex) => (prevIndex === frameImages.length - 1 ? 0 : prevIndex + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [frameImages.length])

  // Auto slider effect for collages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCollageIndex((prevIndex) => (prevIndex === collageImages.length - 1 ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [collageImages.length])

  // Auto slider effect for materials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMaterialIndex((prevIndex) => (prevIndex === materialImages.length - 1 ? 0 : prevIndex + 1))
    }, 3500)

    return () => clearInterval(interval)
  }, [materialImages.length])

  const nextFrameImage = () => {
    setCurrentFrameIndex((prevIndex) => (prevIndex === frameImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevFrameImage = () => {
    setCurrentFrameIndex((prevIndex) => (prevIndex === 0 ? frameImages.length - 1 : prevIndex - 1))
  }

  const nextCollageImage = () => {
    setCurrentCollageIndex((prevIndex) => (prevIndex === collageImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevCollageImage = () => {
    setCurrentCollageIndex((prevIndex) => (prevIndex === 0 ? collageImages.length - 1 : prevIndex - 1))
  }

  const nextMaterialImage = () => {
    setCurrentMaterialIndex((prevIndex) => (prevIndex === materialImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevMaterialImage = () => {
    setCurrentMaterialIndex((prevIndex) => (prevIndex === 0 ? materialImages.length - 1 : prevIndex - 1))
  }

  return (
    <div>
      {/* SECTION 1: Logo Cover with Enhanced Gradient */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        {/* Enhanced Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 z-0" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>
          <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse-slow delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse-slow delay-2000"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse-slow delay-3000"></div>
        </div>

        {/* Logo - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4"
        >
          <img
            src="https://i.postimg.cc/h4bxZ9ZM/Black-White-Minimalist-Initials-Monogram-Jewelry-Logo-removebg-preview.png"
            alt="Company Logo"
            className="w-full h-auto"
          />
        </motion.div>
      </section>

      {/* SECTION 2: About Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl font-serif mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  About Us
                </h2>
                <p className="text-gray-700 text-base mb-6 leading-relaxed">
                  Being a group of entrepreneurs "The Artistic Unity", We wishe to touch the sky with the effort of providing a satisfactory service to our customers through hard work innovation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="overflow-hidden">
                <img src="https://i.postimg.cc/0jynQbMT/3.png" alt="About Us" className="w-full h-auto" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 3: Frames Selection with Full-Size Images */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Choose from number of frame categories
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base">
                Discover our diverse range of meticulously crafted frames, each designed to enhance your cherished
                memories. From minimalist elegance to ornate masterpieces, find the perfect frame for your personal
                style.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {/* Full-Size Image Slider - No Background Frame */}
            <div className="relative overflow-hidden mx-auto">
              <div className="relative h-[70vh] overflow-hidden">
                {frameImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: currentFrameIndex === index ? 1 : 0,
                      scale: currentFrameIndex === index ? 1 : 1.1,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Frame design ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </motion.div>
                ))}

                {/* Navigation Controls - Larger for Mobile */}
                <button
                  onClick={prevFrameImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextFrameImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Dots indicator - Larger for Touch */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                  {frameImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFrameIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${currentFrameIndex === index ? "bg-white w-6" : "bg-white/60"
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: Premium Materials - Now as a Slider */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Made Of Premium Materials
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base">
                We use only the finest materials sourced from around the world, ensuring that each frame is not just
                beautiful but built to last generations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {/* Materials Slider - Full Size Images */}
            <div className="relative overflow-hidden mx-auto">
              <div className="relative h-[70vh] overflow-hidden">
                {materialImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: currentMaterialIndex === index ? 1 : 0,
                      scale: currentMaterialIndex === index ? 1 : 1.1,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${materialInfo[index].title}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </motion.div>
                ))}

                {/* Navigation Controls - Larger for Mobile */}
                <button
                  onClick={prevMaterialImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-10"
                  aria-label="Previous material"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextMaterialImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-10"
                  aria-label="Next material"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Dots indicator - Larger for Touch */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                  {materialImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMaterialIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${currentMaterialIndex === index ? "bg-black w-6" : "bg-black/60"
                        }`}
                      aria-label={`Go to material ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Material Information */}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-serif mb-2 text-gray-800">{materialInfo[currentMaterialIndex].title}</h3>
                <p className="text-gray-600 text-base max-w-2xl mx-auto">
                  {materialInfo[currentMaterialIndex].description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5: Collages Section with Full-Size Images */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Wide Range of Collage Ideas
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base">
                Tell your story through thoughtfully arranged collections of images. Our designer collages create a
                visual narrative that brings your memories to life.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {/* Full-Size Collage Image Slider - No Background Frame */}
            <div className="relative overflow-hidden mx-auto">
              <div className="relative h-[80vh] overflow-hidden">
                {collageImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: currentCollageIndex === index ? 1 : 0,
                      scale: currentCollageIndex === index ? 1 : 1.1,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Collage design ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </motion.div>
                ))}

                {/* Navigation Controls - Larger for Mobile */}
                <button
                  onClick={prevCollageImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-10"
                  aria-label="Previous collage"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextCollageImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-10"
                  aria-label="Next collage"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Dots indicator - Larger for Touch */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                  {collageImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCollageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${currentCollageIndex === index ? "bg-white w-6" : "bg-white/60"
                        }`}
                      aria-label={`Go to collage ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

export default HomeSection
