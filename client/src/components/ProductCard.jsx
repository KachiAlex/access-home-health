import { FaShoppingCart, FaStar, FaFacebook, FaShare, FaHeart } from 'react-icons/fa'
import { useCart, useAuth } from '../hooks/useAuth'
import { useWishlist } from '../hooks/useWishlist'
import { shareToFacebook } from '../utils/fbUtils'
import clsx from 'clsx'
import { useState } from 'react'
import ProductReviews from './ProductReviews'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const placeholderSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial, Helvetica, sans-serif' font-size='20'>${product.name.replace(/"/g, '')}</text></svg>`
  const placeholderDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(placeholderSvg)}`

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    // Show toast notification
    alert(`${product.name} added to cart!`)
  }

  const handleShareToFacebook = () => {
    shareToFacebook(product)
  }

  const { user } = useAuth()
  const { items, addToWishlist, removeFromWishlist } = useWishlist(user?.uid)
  const [saved, setSaved] = useState(() => items.some((i) => i.id === product.id))

  const toggleWishlist = async () => {
    if (!user) return alert('Please log in to save items')
    try {
      if (saved) {
        await removeFromWishlist(product)
        setSaved(false)
        alert('Removed from wishlist')
      } else {
        await addToWishlist(product)
        setSaved(true)
        alert('Saved to wishlist')
      }
    } catch (err) {
      console.error(err)
      alert('Could not update wishlist')
    }
  }

  // Normalize image source: handle string URL or Firestore REST style object
  const resolveImage = () => {
    if (!product) return placeholderDataUri
    if (typeof product.image === 'string' && product.image.trim()) return product.image
    if (product.image && typeof product.image === 'object') {
      if (product.image.stringValue) return product.image.stringValue
      if (product.image.url) return product.image.url
    }
    return placeholderDataUri
  }
  const imageSrc = resolveImage()

  return (
    <div className="card group overflow-hidden hover:shadow-2xl">
      {/* Product Image */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-56 overflow-hidden flex items-center justify-center relative">
        <img
          src={product.image || placeholderDataUri}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = placeholderDataUri
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Stock Badge */}
        <div className={clsx('absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold text-white backdrop-blur-sm', {
          'bg-green-500/90': product.stock > 0,
          'bg-red-500/90': product.stock === 0,
        })}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Name */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description || 'Premium quality medical supply'}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
          <div className="flex text-amber-400 gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-2 font-medium">(0 reviews)</span>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center gap-2">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            ${(product.price || 0).toFixed(2)}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShareToFacebook}
              className="btn btn-outline px-3 py-2 rounded-lg font-semibold transition-all hover:bg-blue-50 border-2 border-blue-600 text-blue-600 flex items-center justify-center"
              title="Share to Facebook"
            >
              <FaFacebook size={16} />
            </button>
            <button
              onClick={toggleWishlist}
              className={clsx('btn px-3 py-2 rounded-lg transition-all flex items-center justify-center', {
                'text-red-500': saved,
                'text-gray-600': !saved,
              })}
              title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <FaHeart size={16} />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={clsx(
                'btn flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all',
                {
                  'btn-primary': product.stock > 0,
                  'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60': product.stock === 0,
                }
              )}
            >
              <FaShoppingCart size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <ProductReviews productId={product.id} />
      </div>
    </div>
  )
}

export default ProductCard
