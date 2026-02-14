import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ResetPassword from './pages/ResetPassword'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import ErrorBoundary from './components/ErrorBoundary'
import AdminAnalytics from './pages/AdminAnalytics'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { useSettings } from './hooks/useSettings'
import { initFacebookSDK } from './utils/fbUtils'
import './styles/animations.css'

function App() {
  const { settings } = useSettings()

  useEffect(() => {
    // Initialize Facebook SDK when settings are loaded
    if (settings?.facebookAppId) {
      initFacebookSDK(settings.facebookAppId)
    }
  }, [settings])

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={<ErrorBoundary><AdminDashboard /></ErrorBoundary>} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
