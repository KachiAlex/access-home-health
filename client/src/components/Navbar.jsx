import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useAuth'
import { useAuth } from '../hooks/useAuth'
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {
  const { cartItems, getTotalItems } = useCart()
  const { user, logout, userRole } = useAuth()
  const cartCount = getTotalItems()

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
                className="h-28 w-auto hover:scale-105 transition-transform"
              />
            </span>
          </Link>

          {/* Nav Links */}
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

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative hover:text-blue-200 transition">
              <FaShoppingCart size={24} />
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
      </div>
    </nav>
  )
}

export default Navbar
