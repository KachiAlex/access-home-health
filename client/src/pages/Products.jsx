import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Products = () => {
  const { products, loading, error } = useProducts()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [carouselIndex, setCarouselIndex] = useState(0)
  const itemsPerSlide = 6 // 2 rows × 3 columns

  useEffect(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter((p) => p.category === category)
    }

    // Filter by price range
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    setFilteredProducts(filtered)
    setCarouselIndex(0) // Reset carousel when filters change
  }, [products, searchTerm, category, priceRange])

  const totalSlides = Math.ceil(filteredProducts.length / itemsPerSlide)
  const currentSlideProducts = filteredProducts.slice(
    carouselIndex * itemsPerSlide,
    (carouselIndex + 1) * itemsPerSlide
  )

  const handlePrevious = () => {
    setCarouselIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 page-transition">
      <h1 className="text-4xl font-bold mb-8 animate-slide-left">Our Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar - Filters */}
        <div className="md:col-span-1 animate-slide-left">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Search</label>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input"
              >
                <option value="all">All Categories</option>
                <option value="mobility">Mobility Aids</option>
                <option value="bedroom">Bedroom Equipment</option>
                <option value="bathroom">Bathroom Aids</option>
                <option value="footwear">Footwear</option>
                <option value="braces">Braces & Support</option>
                <option value="diagnostics">Diagnostics</option>
                <option value="personal-care">Personal Care</option>
                <option value="respiratory">Respiratory</option>
                <option value="medical-supplies">Medical Supplies</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Price Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="input w-20"
                />
                <span>—</span>
                <input
                  type="number"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="input w-20"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setSearchTerm('')
                setCategory('all')
                setPriceRange([0, 5000])
              }}
              className="btn btn-secondary w-full"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="md:col-span-3 animate-slide-up">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse-slow text-gray-400">Loading products...</div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setCategory('all')
                  setPriceRange([0, 5000])
                }}
                className="btn btn-primary mt-4"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Showing {filteredProducts.length} products
              </p>
              
              {/* Carousel Container */}
              <div className="relative">
                {/* Products Grid - 2 rows */}
                <div className="transition-transform duration-500 ease-out">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger min-h-96">
                    {currentSlideProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute top-1/2 -left-16 transform -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg"
                      aria-label="Previous products"
                    >
                      <FaChevronLeft size={24} />
                    </button>

                    <button
                      onClick={handleNext}
                      className="absolute top-1/2 -right-16 transform -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg"
                      aria-label="Next products"
                    >
                      <FaChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Dot Indicators */}
                {totalSlides > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCarouselIndex(idx)}
                        className={`transition-all rounded-full ${
                          idx === carouselIndex
                            ? 'bg-blue-600 w-3 h-3'
                            : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Slide Counter */}
                {totalSlides > 1 && (
                  <p className="text-center text-gray-500 text-sm mt-4">
                    Slide {carouselIndex + 1} of {totalSlides}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
