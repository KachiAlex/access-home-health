import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../hooks/useWishlist'
import ProductCard from '../components/ProductCard'

const Wishlist = () => {
  const { user } = useAuth()
  const { items, loading, error, removeFromWishlist } = useWishlist(user?.uid)

  if (!user) return <p className="p-6">Please log in to view your wishlist.</p>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {loading ? (
        <p>Loading wishlist...</p>
      ) : error ? (
        <p className="text-red-500">Error loading wishlist.</p>
      ) : items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <div key={p.id} className="relative">
              <ProductCard product={p} />
              <button
                onClick={() => removeFromWishlist(p)}
                className="absolute top-2 right-2 bg-white p-2 rounded shadow"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
