import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    // Provide a lightweight localStorage-based fallback so UI remains interactive
    // when the CartProvider isn't mounted (helps dev/server mismatch scenarios).
    const fallback = {
      cartItems: JSON.parse(localStorage.getItem('cart') || '[]'),
      addToCart: (product) => {
        try {
          const cur = JSON.parse(localStorage.getItem('cart') || '[]')
          const existing = cur.find((i) => i.id === product.id)
          let next
          if (existing) {
            next = cur.map((i) => (i.id === product.id ? { ...i, quantity: (i.quantity || 1) + (product.quantity || 1) } : i))
          } else {
            next = [...cur, { ...product, quantity: product.quantity || 1 }]
          }
          localStorage.setItem('cart', JSON.stringify(next))
          window.dispatchEvent(new Event('storage'))
        } catch (e) {
          console.error('fallback addToCart failed', e)
        }
      },
      removeFromCart: (id) => {
        try {
          const cur = JSON.parse(localStorage.getItem('cart') || '[]')
          const next = cur.filter((i) => i.id !== id)
          localStorage.setItem('cart', JSON.stringify(next))
          window.dispatchEvent(new Event('storage'))
        } catch (e) { console.error('fallback removeFromCart', e) }
      },
      updateQuantity: (id, qty) => {
        try {
          const cur = JSON.parse(localStorage.getItem('cart') || '[]')
          const next = cur.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
          localStorage.setItem('cart', JSON.stringify(next))
          window.dispatchEvent(new Event('storage'))
        } catch (e) { console.error('fallback updateQuantity', e) }
      },
      clearCart: () => {
        localStorage.setItem('cart', JSON.stringify([]))
        window.dispatchEvent(new Event('storage'))
      },
      getTotalItems: () => JSON.parse(localStorage.getItem('cart') || '[]').reduce((s, i) => s + (i.quantity || 0), 0),
      getTotalPrice: () => JSON.parse(localStorage.getItem('cart') || '[]').reduce((s, i) => s + (i.price || 0) * (i.quantity || 0), 0),
    }
    return fallback
  }
  return context
}
