import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useAuth'
import { useAuth } from '../hooks/useAuth'
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const cartContext = useCart()
  const { user, logout, userRole } = useAuth()
  const getTotalItems = (cartContext && cartContext.getTotalItems) || (() => JSON.parse(localStorage.getItem('cart') || '[]').reduce((s, i) => s + (i.quantity || 0), 0))
  const [cartCount, setCartCount] = useState(getTotalItems())
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onStorage = () => setCartCount(getTotalItems())
    window.addEventListener('storage', onStorage)
    // also poll in case the app updates without storage event
    const iv = setInterval(() => setCartCount(getTotalItems()), 1000)
    return () => { window.removeEventListener('storage', onStorage); clearInterval(iv) }
  }, [])

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="inline-flex items-center justify-center bg-white rounded-md p-1">
              <img
                src="/logo.png"
                alt="Access Health Logo"
                className="h-12 sm:h-16 md:h-20 lg:h-28 w-auto hover:scale-105 transition-transform"
              />
              />
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-blue-200 transition">
              Products
            </Link>
            {userRole === 'admin' && (
              <Link to="/admin" className="hover:text-blue-200 transition">
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileOpen((s) => !s)} className="p-2 rounded-md hover:bg-blue-500">
              {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative hover:text-blue-200 transition">
              <FaShoppingCart size={24} className="text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm">{user.email}</span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 hover:text-blue-200 transition"
                >
                  <FaSignOutAlt size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 hover:text-blue-200 transition">
                <FaUser size={18} />
                <span className="text-sm">Login</span>
              </Link>
            )}
          </div>
        </div>
        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="md:hidden mt-2 pb-4">
            <div className="bg-blue-600 text-white rounded-md p-4 space-y-3">
              <Link to="/" onClick={() => setMobileOpen(false)} className="block">Home</Link>
              <Link to="/products" onClick={() => setMobileOpen(false)} className="block">Products</Link>
              {userRole === 'admin' && <Link to="/admin" onClick={() => setMobileOpen(false)} className="block">Admin Dashboard</Link>}
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="block">Cart ({cartCount})</Link>
              {user ? (
                <button onClick={() => { logout(); setMobileOpen(false) }} className="w-full text-left">Logout</button>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block">Login</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
