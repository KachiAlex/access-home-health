import { FaShoppingCart, FaStar, FaFacebook, FaShare, FaHeart } from 'react-icons/fa'
import { useCart, useAuth } from '../hooks/useAuth'
import { useWishlist } from '../hooks/useWishlist'
import { shareToFacebook } from '../utils/fbUtils'
import clsx from 'clsx'
import { useState } from 'react'
import ProductReviews from './ProductReviews'
import ProductModal from './ProductModal'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { items = [], addToWishlist, removeFromWishlist } = useWishlist(user?.uid) || {}
  const [saved, setSaved] = useState(() => items.some((i) => i.id === product.id))

  const resolveImage = () => {
    if (!product) return null
    if (typeof product.image === 'string' && product.image.trim()) {
      const s = product.image.trim()
      if (s.startsWith('data:')) return null
      return s
    }
    if (product.image && typeof product.image === 'object') {
      return product.image.stringValue || product.image.url || null
    }
    return null
  }

  const imageSrc = resolveImage()

  const handleAddToCart = () => {
    if (typeof addToCart === 'function') {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 })
    } else {
      try {
        const cur = JSON.parse(localStorage.getItem('cart') || '[]')
        const existing = cur.find((i) => i.id === product.id)
        const next = existing
          ? cur.map((i) => (i.id === product.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i))
          : [...cur, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }]
        localStorage.setItem('cart', JSON.stringify(next))
        window.dispatchEvent(new Event('storage'))
      } catch (err) {
        console.error('fallback addToCart error', err)
      }
    }
    alert(`${product.name} added to cart!`)
  }

  const toggleWishlist = async () => {
    if (!user) return alert('Please log in to save items')
    try {
      if (saved) {
        await removeFromWishlist(product)
        setSaved(false)
      } else {
        await addToWishlist(product)
        setSaved(true)
      }
    } catch (err) { console.error(err) }
  }

  const [open, setOpen] = useState(false)

  return (
    <>
    <div onClick={() => setOpen(true)} role="button" tabIndex={0} className="card group overflow-hidden hover:shadow-2xl cursor-pointer">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-44 sm:h-56 overflow-hidden flex items-center justify-center relative">
        {imageSrc ? (
          <img src={imageSrc} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 px-4">
            <span className="text-sm text-center">{product.name}</span>
          </div>
        )}

        <div className={clsx('absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold text-white', {
          'bg-green-500/90': product.stock > 0,
          'bg-red-500/90': product.stock === 0,
        })}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description || 'Premium quality medical supply'}</p>

        <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
          <div className="flex text-amber-400 gap-1">
            {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
          </div>
          <span className="text-gray-500 text-xs ml-2 font-medium">(0 reviews)</span>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{"$" + ((product.price || 0).toFixed(2))}</div>
          <div className="flex gap-2">
            <button onClick={(e) => { e.stopPropagation(); shareToFacebook(product) }} className="btn btn-outline px-3 py-2 rounded-lg"> <FaFacebook size={16} /> </button>
            <button onClick={(e) => { e.stopPropagation(); toggleWishlist() }} className={clsx('btn px-3 py-2 rounded-lg', { 'text-red-500': saved })}><FaHeart size={16} /></button>
            <button onClick={(e) => { e.stopPropagation(); handleAddToCart() }} disabled={product.stock === 0} className={clsx('btn flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold', { 'btn-primary': product.stock > 0 })}>
              <FaShoppingCart size={16} /> <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <ProductReviews productId={product.id} />
      </div>
    </div>

    <ProductModal product={product} open={open} onClose={() => setOpen(false)} onAddToCart={() => { handleAddToCart(); setOpen(false) }} />
    </>
  )
}

export default ProductCard
