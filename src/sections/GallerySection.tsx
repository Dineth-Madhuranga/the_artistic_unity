"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"

const GallerySection = () => {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("General")
  const [featuredFrameId, setFeaturedFrameId] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const frames = [
    {
      id: 103,
      name: "Mount Frame",
      type: "General",
      image: "https://i.postimg.cc/HxdRbj5Q/10.png",
    },
    {
      id: 102,
      name: "Glass Frame",
      type: "General",
      image: "https://i.postimg.cc/t4ZFzjHJ/7.png",
    },
    {
      id: 301,
      name: "Rotating Frame",
      type: "Modern",
      image: "https://i.postimg.cc/B6PpL07x/31.png",
    },
    {
      id: 202,
      name: "Plymount Frame",
      type: "Boarderless",
      image: "https://i.postimg.cc/6Qr7BZ7x/13.png",
    },
    {
      id: 302,
      name: "Floating Frame",
      type: "Modern",
      image: "https://i.postimg.cc/RFpdq0TC/27.png",
    },
    {
      id: 203,
      name: "Embossed Frame",
      type: "Boarderless",
      image: "https://i.postimg.cc/QdLxVtZ8/18.png",
    },
    {
      id: 204,
      name: "Compound Frame",
      type: "Boarderless",
      image: "https://i.postimg.cc/MGvbNwSh/22.png",
    },
  ]

  const filteredFrames = frames.filter((frame) => {
    const matchesFilter = filter === "all" || frame.type === filter
    const matchesSearch = frame.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Group frames by category
  const framesByCategory = frames.reduce((acc, frame) => {
    if (!acc[frame.type]) {
      acc[frame.type] = []
    }
    acc[frame.type].push(frame)
    return acc
  }, {})

  // Get unique categories
  const categories = Object.keys(framesByCategory)

  // Get frames of the currently selected category
  const categoryFrames = frames.filter((frame) => frame.type === selectedCategory)

  // Update featured frame when category changes
  useEffect(() => {
    if (categoryFrames.length > 0) {
      setFeaturedFrameId(categoryFrames[0].id)
      setCurrentImageIndex(0)
    }
  }, [selectedCategory])

  // Get the currently featured frame
  const featuredFrame =
    frames.find((frame) => frame.id === featuredFrameId) || (categoryFrames.length > 0 ? categoryFrames[0] : frames[0])

  // Handle thumbnail click
  const handleThumbnailClick = (frameId, index) => {
    setFeaturedFrameId(frameId)
    setCurrentImageIndex(index)
  }

  // Navigation for featured frames
  const nextFeaturedFrame = () => {
    const currentIndex = categoryFrames.findIndex((frame) => frame.id === featuredFrameId)
    const nextIndex = (currentIndex + 1) % categoryFrames.length
    setFeaturedFrameId(categoryFrames[nextIndex].id)
    setCurrentImageIndex(nextIndex)
  }

  const prevFeaturedFrame = () => {
    const currentIndex = categoryFrames.findIndex((frame) => frame.id === featuredFrameId)
    const prevIndex = (currentIndex - 1 + categoryFrames.length) % categoryFrames.length
    setFeaturedFrameId(categoryFrames[prevIndex].id)
    setCurrentImageIndex(prevIndex)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">Our Frame Collection</h1>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Browse our extensive collection of handcrafted photo frames. Each piece is designed with attention to detail
          and made from premium materials.
        </p>

        {/* Search and Filter - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search frames..."
              className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">Filter:</span>
            <select
              className="border border-gray-300 rounded-md px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Frames</option>
              <option value="General">General</option>
              <option value="Boarderless">Borderless</option>
              <option value="Modern">Modern</option>
            </select>
          </div>
        </div>

        {/* Category Tabs - Mobile Optimized */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-3 rounded-md font-medium text-base ${selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Category Card - Larger Images & Mobile Optimized */}
        <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg mb-12">
          <div className="relative bg-gradient-to-br from-pink-200 via-blue-200 to-teal-200 p-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">{selectedCategory.toUpperCase()} FRAMES</h2>

            {/* Main featured frame - Larger Image */}
            <div className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center mb-8">
              <img
                src={featuredFrame.image || "/placeholder.svg"}
                alt={featuredFrame.name}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />

              {/* Navigation Controls - Larger for Mobile */}
              {categoryFrames.length > 1 && (
                <>
                  <button
                    onClick={prevFeaturedFrame}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 z-10"
                    aria-label="Previous frame"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextFeaturedFrame}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 z-10"
                    aria-label="Next frame"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Clickable Thumbnails - Larger & Mobile Optimized */}
            <div className="flex justify-center flex-wrap gap-4 mb-6">
              {framesByCategory[selectedCategory]?.map((frame, index) => (
                <div
                  key={frame.id}
                  className={`w-20 h-20 bg-white p-1 shadow-md cursor-pointer transition-all duration-200 ${featuredFrameId === frame.id ? "ring-2 ring-indigo-500 scale-110" : "hover:scale-105"
                    }`}
                  onClick={() => handleThumbnailClick(frame.id, index)}
                >
                  <img
                    src={frame.image || "/placeholder.svg"}
                    alt={frame.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Frame name display */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold">{featuredFrame.name}</h3>
            </div>

            {/* Select Button - Larger for Mobile */}
            <div className="flex justify-center">
              <Link
                to={`/purchase/${featuredFrame.id}`}
                className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold text-xl px-12 py-4 rounded-full uppercase"
              >
                SELECT
              </Link>
            </div>
          </div>
        </div>

        {/* Regular Gallery Grid - Larger Images & Mobile Optimized */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">All Available Frames</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFrames.map((frame) => (
            <div
              key={frame.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={frame.image || "/placeholder.svg"}
                  alt={frame.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Link
                    to={`/purchase/${frame.id}`}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium text-lg transform -translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-1">{frame.name}</h3>
                <span className="text-base text-gray-500 capitalize">{frame.type}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredFrames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No frames found matching your criteria.</p>
            <button
              onClick={() => {
                setFilter("all")
                setSearchQuery("")
              }}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium text-lg py-2 px-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GallerySection
