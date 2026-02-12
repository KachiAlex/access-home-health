import { useState } from 'react'
import { useCart } from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import { FaTrash, FaArrowLeft, FaCheckCircle, FaTruck } from 'react-icons/fa'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCart()
  const [discountCode, setDiscountCode] = useState('')
  const [discountError, setDiscountError] = useState('')
  const [discount, setDiscount] = useState(0)
  
  const total = getTotalPrice()
  const taxAmount = total * 0.08
  const shippingFree = total >= 100
  const discountAmount = (total * discount) / 100
  const finalTotal = (total - discountAmount + (shippingFree ? 0 : 10)) * 1.08
  
  const applyDiscount = () => {
    if (discountCode === 'WELCOME10') {
      setDiscount(10)
      setDiscountError('')
    } else if (discountCode === 'SAVE20') {
      setDiscount(20)
      setDiscountError('')
    } else {
      setDiscount(0)
      setDiscountError('Invalid discount code')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-blue-600">Step 1 of 3</span>
            <span className="text-sm text-gray-600">Shopping Cart</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{width: '33%'}}></div>
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
          <Link to="/products" className="btn btn-primary inline-flex items-center space-x-2 px-8 py-3">
            <FaArrowLeft />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 page-transition">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-blue-600">Step 1 of 3</span>
          <span className="text-sm text-gray-600">Shopping Cart</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{width: '33%'}}></div>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-2 animate-slide-left">Shopping Cart</h1>
      <p className="text-gray-600 mb-8 animate-slide-left">You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 animate-slide-up">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 border-b-2 border-blue-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Product</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Quantity</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Total</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl">📦</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-xs text-gray-500">SKU: {item.id.substr(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">${(item.price || 0).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 transition text-gray-600 font-semibold"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                          }
                          className="input w-12 text-center"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 transition text-gray-600 font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600">
                      ${((item.price || 0) * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition"
                        title="Remove item"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-6 gap-4 flex-wrap">
            <Link to="/products" className="btn btn-outline inline-flex items-center space-x-2">
              <FaArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
            <button
              onClick={clearCart}
              className="btn btn-outline hover:bg-red-50 border-red-300 text-red-600"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1 animate-slide-left">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            {/* Discount Code Section */}
            <div className="mb-6 pb-6 border-b">
              <label className="block text-sm font-semibold mb-2">Discount Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => {
                    setDiscountCode(e.target.value.toUpperCase())
                    setDiscountError('')
                  }}
                  placeholder="e.g. WELCOME10"
                  className="input flex-1 text-sm"
                />
                <button
                  onClick={applyDiscount}
                  className="btn btn-primary px-4 py-2 text-sm whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
              {discountError && <p className="text-red-600 text-xs mt-2">{discountError}</p>}
              {discount > 0 && (
                <p className="text-green-600 text-xs mt-2 flex items-center">
                  <FaCheckCircle size={14} className="mr-1" /> {discount}% discount applied!
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">Try: WELCOME10 or SAVE20</p>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount}%):</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold">{shippingFree ? <span className="text-green-600">Free</span> : '$10.00'}</span>
              </div>
              {shippingFree && (
                <div className="bg-green-50 border border-green-200 rounded p-2 flex items-center text-xs text-green-700">
                  <FaTruck size={14} className="mr-2" />
                  <strong>Free shipping!</strong> You qualified for free delivery!
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%):</span>
                <span className="font-semibold">${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="btn btn-primary w-full text-center block font-semibold py-3">
              Proceed to Checkout →
            </Link>

            <p className="text-xs text-gray-500 text-center mt-4">
              ✓ Secure checkout • ✓ Easy returns • ✓ Fast delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
