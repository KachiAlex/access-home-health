import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import ProductCard from '../components/ProductCard'
import { FaBox, FaShippingFast, FaHeadset, FaCheckCircle } from 'react-icons/fa'
import { useProducts } from '../hooks/useProducts'

const Home = () => {
  const { products, loading } = useProducts()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [itemsPerRow, setItemsPerRow] = useState(4)

  useEffect(() => {
    // Display up to 20 products as featured (max 5 rows)
    setFeaturedProducts(products.slice(0, 20))
  }, [products])

  useEffect(() => {
    const getItems = (w) => {
      if (w >= 2000) return 8
      if (w >= 1600) return 6
      if (w >= 1200) return 5
      if (w >= 900) return 4
      if (w >= 640) return 3
      return 2
    }
    const update = () => setItemsPerRow(getItems(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const features = [
    {
      icon: <FaBox size={40} />,
      title: 'Wide Selection',
      description: 'Over 500+ medical supplies and equipment',
    },
    {
      icon: <FaShippingFast size={40} />,
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $100',
    },
    {
      icon: <FaHeadset size={40} />,
      title: '24/7 Support',
      description: 'Expert customer service team ready to help',
    },
    {
      icon: <FaCheckCircle size={40} />,
      title: 'Quality Assured',
      description: 'All products certified and quality checked',
    },
  ]

  return (
    <div className="min-h-screen page-transition">
      {/* Hero Banner Section */}
      <section className="w-full animate-fade-in">
        <HeroBanner />
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 animate-slide-up">Why Choose Us?</h2>
          <p className="text-center text-gray-600 text-lg mb-12 animate-slide-up">Trusted by thousands for quality medical supplies</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-stagger">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card text-center group"
              >
                <div className="flex justify-center mb-6 text-5xl text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-slide-up">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Featured Products</h2>
          <p className="text-gray-600 text-lg">
            Discover our popular medical supplies and equipment
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse-slow text-gray-400">Loading products...</div>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-gray-500 text-lg font-medium">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Up to 5 horizontally-scrollable rows, 4 items per row */}
            {Array.from({ length: Math.min(5, Math.ceil(featuredProducts.length / itemsPerRow)) }).map((_, rowIdx) => {
              const start = rowIdx * itemsPerRow
              const rowItems = featuredProducts.slice(start, start + itemsPerRow)
              return (
                <div key={rowIdx} className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{`Featured — Row ${rowIdx + 1}`}</h3>
                  </div>
                  <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
                    <div className="flex gap-6 w-max py-2">
                      {rowItems.map((product) => (
                        <div key={product.id} className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[240px] xl:min-w-[260px] w-60 flex-shrink-0">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-16 mt-16 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Need Help Finding What You Need?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Our expert team is here to help. Browse our full catalog or contact us
            for personalized assistance.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Link to="/products" className="btn btn-outline bg-white text-blue-600 hover:bg-gray-50 px-8 py-3">
              View All Products
            </Link>
            <button className="btn btn-outline border-2 border-white text-white hover:bg-white/20 px-8 py-3">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
