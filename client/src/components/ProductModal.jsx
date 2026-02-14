import React from 'react'
import { FaTimes, FaShoppingCart } from 'react-icons/fa'

const ProductModal = ({ product, open, onClose, onAddToCart }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-xl overflow-hidden z-10">
        <div className="flex items-start justify-between p-4 border-b">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <FaTimes />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center bg-gray-100">
            {product.image ? (
              <img src={product.image} alt={product.name} className="max-h-60 object-contain" />
            ) : (
              <div className="p-6 text-center text-gray-500">No image</div>
            )}
          </div>

          <div>
            <p className="text-gray-700 mb-4">{product.description || 'No description available.'}</p>
            <div className="text-2xl font-bold mb-4">{"$" + ((product.price || 0).toFixed(2))}</div>

            <div className="flex items-center gap-3">
              <button onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart() }} className="btn btn-primary px-4 py-2 flex items-center gap-2">
                <FaShoppingCart /> <span>Add to cart</span>
              </button>
              <button onClick={onClose} className="btn btn-outline px-4 py-2">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
