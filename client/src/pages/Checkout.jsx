import { useState, useMemo, useEffect } from 'react'
import { useCart } from '../hooks/useAuth'
import { useAuth } from '../hooks/useAuth'
import { logEvent } from '../services/analyticsService'
import { getFunctions, httpsCallable } from 'firebase/functions'
import app, { db } from '../config/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaCreditCard, FaLock, FaArrowLeft } from 'react-icons/fa'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useSettings } from '../hooks/useSettings'

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const { settings } = useSettings()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [showReview, setShowReview] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    paymentMethod: 'card',
    transferReference: '',
  })
  const [paypalError, setPaypalError] = useState('')
  const [paypalLoading, setPaypalLoading] = useState(false)

  const paypalClientId = settings?.paypalClientId || ''
  const paypalEnabled = Boolean(paypalClientId)
  const paypalOptions = useMemo(() => {
    if (!paypalClientId) return null
    return {
      'client-id': paypalClientId,
      currency: 'USD',
      intent: 'CAPTURE',
    }
  }, [paypalClientId])

  useEffect(() => {
    if (!paypalEnabled && formData.paymentMethod === 'paypal') {
      setFormData((prev) => ({ ...prev, paymentMethod: 'card' }))
    }
  }, [paypalEnabled, formData.paymentMethod])

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-blue-600">Step 2 of 3</span>
            <span className="text-sm text-gray-600">Checkout</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{width: '66%'}}></div>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
          <Link to="/products" className="btn btn-primary inline-flex items-center space-x-2">
            <FaArrowLeft />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    )
  }

  const total = getTotalPrice()
  const tax = total * 0.08
  const finalTotal = total + tax

  const buildOrderData = () => ({
    items: cartItems,
    total: Number(finalTotal.toFixed(2)),
    userId: user?.uid || null,
    email: formData.email,
    customerName: `${formData.firstName} ${formData.lastName}`.trim(),
    phone: formData.phone,
    shipping: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zipCode,
    },
  })

  const postOrderSuccess = async ({ orderId, order, paymentMethod }) => {
    const resolvedPaymentMethod =
      paymentMethod || order?.paymentMethod || formData.paymentMethod || 'card'

    try {
      await logEvent('order_placed', {
        userId: order?.userId || user?.uid || null,
        total: order?.total || finalTotal,
        items: order?.items?.length ?? cartItems.length,
        orderId,
        paymentMethod: resolvedPaymentMethod,
      })
    } catch (err) {
      console.warn('Analytics logging failed', err)
    }

    if (order?.email) {
      try {
        const functions = getFunctions(app)
        const sendOrderEmail = httpsCallable(functions, 'sendOrderEmailV2')
        const totalValue = Number(order?.total ?? finalTotal).toFixed(2)
        const html = `<p>Thank you for your order. Order #${orderId}. Order total: $${totalValue}</p>`
        await sendOrderEmail({ to: order.email, subject: 'Order Confirmation', html })
      } catch (fnErr) {
        console.warn('Send email function call failed', fnErr)
      }
    }
  }

  const getAuthHeaders = async () => {
    const token = await user?.getIdToken?.()
    if (!token) {
      throw new Error('You must be logged in to use PayPal checkout.')
    }
    return {
      Authorization: `Bearer ${token}`,
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email address'
    if (!formData.phone.trim()) errors.phone = 'Phone is required'
    if (!formData.address.trim()) errors.address = 'Address is required'
    if (!formData.city.trim()) errors.city = 'City is required'
    if (!formData.state.trim()) errors.state = 'State is required'
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required'
    // Only validate card fields when card payment selected
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required'
      if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) errors.cardNumber = 'Invalid card number'
      if (!formData.expiry.trim()) errors.expiry = 'Expiry date is required'
      if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) errors.expiry = 'Use MM/YY format'
      if (!formData.cvv.trim() || !/^\d{3,4}$/.test(formData.cvv)) errors.cvv = 'Invalid CVV'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleReview = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setShowReview(true)
    }
  }

  const finalizeOrder = async ({ paymentMethod, status, meta } = {}) => {
    const resolvedPaymentMethod = paymentMethod || formData.paymentMethod || 'card'
    const resolvedStatus =
      status ||
      (resolvedPaymentMethod === 'transfer'
        ? 'Pending Transfer'
        : resolvedPaymentMethod === 'paypal'
        ? 'Paid'
        : 'Pending')

    const baseOrder = buildOrderData()
    const order = {
      ...baseOrder,
      paymentMethod: resolvedPaymentMethod,
      transferReference:
        resolvedPaymentMethod === 'transfer' ? formData.transferReference || null : null,
      status: resolvedStatus,
      createdAt: serverTimestamp(),
      ...meta,
    }

    const docRef = await addDoc(collection(db, 'orders'), order)
    const orderId = docRef.id

    await postOrderSuccess({ orderId, order, paymentMethod: resolvedPaymentMethod })

    return { orderId, order }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.paymentMethod === 'paypal') {
      setPaypalError('Please complete your payment using the PayPal button below.')
      return
    }
    setLoading(true)
    try {
      const { orderId } = await finalizeOrder()
      alert(`✓ Order placed successfully! Order #${orderId}`)
      clearCart()
      navigate('/')
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error processing order')
    } finally {
      setLoading(false)
    }
  }

  const createServerPayPalOrder = async () => {
    setPaypalError('')
    setPaypalLoading(true)
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(await getAuthHeaders()),
        },
        body: JSON.stringify({
          amount: Number(finalTotal.toFixed(2)),
          currency: 'USD',
          description: `Order total for ${cartItems.length} item(s)`,
          items: cartItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: Number(item.price || 0),
          })),
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data?.id) {
        throw new Error(data?.error || 'Failed to create PayPal order')
      }
      return data.id
    } catch (err) {
      console.error('PayPal create order error', err)
      const message = err?.message || 'Unable to create PayPal order. Please try again.'
      setPaypalError(message)
      throw err
    } finally {
      setPaypalLoading(false)
    }
  }

  const handlePayPalApprove = async (data) => {
    if (!data?.orderID) {
      setPaypalError('Missing PayPal order information. Please try again.')
      return
    }
    setPaypalError('')
    setPaypalLoading(true)
    try {
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(await getAuthHeaders()),
        },
        body: JSON.stringify({
          orderId: data.orderID,
          orderData: buildOrderData(),
        }),
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Failed to capture PayPal order')
      }

      await postOrderSuccess({
        orderId: result.orderId,
        order:
          result.order || {
            ...buildOrderData(),
            paymentMethod: 'paypal',
            status: 'Paid',
          },
        paymentMethod: 'paypal',
      })

      alert(`✓ Payment received! Order #${result.orderId}`)
      clearCart()
      navigate('/')
    } catch (err) {
      console.error('PayPal approval error:', err)
      const message = err?.message || 'PayPal payment failed. Please try again or use another method.'
      setPaypalError(message)
    } finally {
      setPaypalLoading(false)
    }
  }

  const checkoutContent = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 page-transition">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-blue-600">Step 2 of 3</span>
          <span className="text-sm text-gray-600">Checkout {showReview ? ' → Review' : ''}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{width: showReview ? '66%' : '66%'}}></div>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-2 animate-slide-left">Checkout</h1>
      <p className="text-gray-600 mb-8 animate-slide-left">{showReview ? 'Review your order before placing it' : 'Complete your shipping and payment information'}</p>

      {!showReview ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 animate-slide-up">
            <form onSubmit={handleReview} className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
                  Shipping Address
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`input ${formErrors.firstName ? 'border-red-500' : ''}`}
                    />
                    {formErrors.firstName && <p className="text-red-600 text-xs mt-1">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`input ${formErrors.lastName ? 'border-red-500' : ''}`}
                    />
                    {formErrors.lastName && <p className="text-red-600 text-xs mt-1">{formErrors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input w-full mb-4 ${formErrors.email ? 'border-red-500' : ''}`}
                  />
                  {formErrors.email && <p className="text-red-600 text-xs mt-1 mb-4">{formErrors.email}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input w-full mb-4 ${formErrors.phone ? 'border-red-500' : ''}`}
                  />
                  {formErrors.phone && <p className="text-red-600 text-xs mt-1 mb-4">{formErrors.phone}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address *"
                    value={formData.address}
                    onChange={handleChange}
                    className={`input w-full mb-4 ${formErrors.address ? 'border-red-500' : ''}`}
                  />
                  {formErrors.address && <p className="text-red-600 text-xs mt-1 mb-4">{formErrors.address}</p>}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      value={formData.city}
                      onChange={handleChange}
                      className={`input ${formErrors.city ? 'border-red-500' : ''}`}
                    />
                    {formErrors.city && <p className="text-red-600 text-xs mt-1">{formErrors.city}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="state"
                      placeholder="State *"
                      value={formData.state}
                      onChange={handleChange}
                      className={`input ${formErrors.state ? 'border-red-500' : ''}`}
                    />
                    {formErrors.state && <p className="text-red-600 text-xs mt-1">{formErrors.state}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code *"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`input ${formErrors.zipCode ? 'border-red-500' : ''}`}
                    />
                    {formErrors.zipCode && <p className="text-red-600 text-xs mt-1">{formErrors.zipCode}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
                  Payment Information
                </h2>

                <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6 flex items-center gap-2 text-sm text-blue-800">
                  <FaLock size={16} />
                  <span>Your payment information is encrypted and secure</span>
                </div>

                {/* Payment method selector */}
                <div className="mb-4 flex flex-wrap gap-4 items-center">
                  <label className="inline-flex items-center">
                    <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="mr-2" />
                    <span>Card</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="paymentMethod" value="transfer" checked={formData.paymentMethod === 'transfer'} onChange={handleChange} className="mr-2" />
                    <span>Bank Transfer (test)</span>
                  </label>
                  {paypalEnabled ? (
                    <label className="inline-flex items-center">
                      <input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} className="mr-2" />
                      <span>PayPal</span>
                    </label>
                  ) : (
                    <span className="text-xs text-gray-500">
                      PayPal checkout is disabled until a client ID is configured by admin.
                    </span>
                  )}
                </div>

                {/* Transfer instructions when selected */}
                {formData.paymentMethod === 'transfer' && (
                  <div className="mb-4 p-4 bg-gray-50 rounded text-sm text-gray-700">
                    <p className="font-semibold">Send test transfer to:</p>
                    <p>Bank: Example Bank</p>
                    <p>Account: 123456789</p>
                    <p>Name: Access Health Test</p>
                    <p className="mt-2">After sending, optionally enter the transaction reference below.</p>
                    <input
                      type="text"
                      name="transferReference"
                      placeholder="Transaction reference (optional)"
                      value={formData.transferReference}
                      onChange={handleChange}
                      className="input w-full mt-2"
                    />
                  </div>
                )}

                {/* PayPal helper copy */}
                {formData.paymentMethod === 'paypal' && paypalEnabled && (
                  <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-900">
                    <p className="font-semibold">Pay with PayPal</p>
                    <p>Review your order below, then click the PayPal button to complete payment.</p>
                  </div>
                )}

                {formData.paymentMethod === 'card' && (
                  <>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number (16 digits) *"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleChange({
                          ...e,
                          target: {
                            ...e.target,
                            value: e.target.value.replace(/\D/g, '').substring(0, 16),
                          },
                        })
                      }
                      className={`input w-full mb-4 ${formErrors.cardNumber ? 'border-red-500' : ''}`}
                    />
                    {formErrors.cardNumber && (
                      <p className="text-red-600 text-xs mt-1 mb-4">{formErrors.cardNumber}</p>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY *"
                          value={formData.expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '').substring(0, 4)
                            if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2)
                            handleChange({
                              ...e,
                              target: {
                                ...e.target,
                                value: val,
                              },
                            })
                          }}
                          className={`input ${formErrors.expiry ? 'border-red-500' : ''}`}
                        />
                        {formErrors.expiry && (
                          <p className="text-red-600 text-xs mt-1">{formErrors.expiry}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV *"
                          value={formData.cvv}
                          onChange={(e) =>
                            handleChange({
                              ...e,
                              target: {
                                ...e.target,
                                value: e.target.value.replace(/\D/g, '').substring(0, 4),
                              },
                            })
                          }
                          className={`input ${formErrors.cvv ? 'border-red-500' : ''}`}
                        />
                        {formErrors.cvv && (
                          <p className="text-red-600 text-xs mt-1">{formErrors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full text-lg font-semibold py-3 flex items-center justify-center gap-2"
              >
                <FaCreditCard />
                Review Order
              </button>
              
              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn btn-outline w-full font-semibold py-3"
              >
                ← Back to Cart
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 animate-slide-left">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto border-b pb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-blue-600">
                      ${((item.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%):</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Order Review Page
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-slide-up">
            {/* Shipping Review */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Shipping Address</h3>
                <button
                  onClick={() => setShowReview(false)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  Edit
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold">{formData.firstName} {formData.lastName}</p>
                <p className="text-gray-600">{formData.address}</p>
                <p className="text-gray-600">{formData.city}, {formData.state} {formData.zipCode}</p>
                <p className="text-gray-600">Email: {formData.email}</p>
                <p className="text-gray-600">Phone: {formData.phone}</p>
              </div>
            </div>

            {/* Payment Review */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Payment Method</h3>
                <button
                  onClick={() => setShowReview(false)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  Edit
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                {formData.paymentMethod === 'card' ? (
                  <div className="flex items-center gap-3">
                    <FaCreditCard size={24} className="text-blue-600" />
                    <div>
                      <p className="font-semibold">Card ending in {formData.cardNumber.slice(-4)}</p>
                      <p className="text-gray-600 text-sm">Expires: {formData.expiry}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold">Bank Transfer (test)</p>
                    <p>Bank: Example Bank</p>
                    <p>Account: 123456789</p>
                    <p>Name: Access Health Test</p>
                    {formData.transferReference && <p className="mt-2">Reference: {formData.transferReference}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-xl font-bold mb-4">Order Items</h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full">📦</div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-blue-600">${((item.price || 0) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-slide-left">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Total</h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%):</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-blue-600">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {formData.paymentMethod === 'paypal' && paypalEnabled ? (
                <div className="space-y-3">
                  {paypalError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded">
                      {paypalError}
                    </div>
                  )}
                  <PayPalButtons
                    style={{ layout: 'vertical' }}
                    disabled={paypalLoading}
                    forceReRender={[finalTotal, paypalLoading]}
                    createOrder={createServerPayPalOrder}
                    onApprove={handlePayPalApprove}
                    onError={(err) => {
                      console.error('PayPal button error', err)
                      setPaypalError('Unable to initialize PayPal. Please try again later.')
                    }}
                  />
                  <button
                    onClick={() => setShowReview(false)}
                    className="btn btn-outline w-full font-semibold py-2"
                    disabled={paypalLoading}
                  >
                    Back to Form
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn btn-primary w-full text-lg font-semibold py-3 flex items-center justify-center gap-2 mb-3"
                  >
                    <FaCheckCircle />
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>

                  <button
                    onClick={() => setShowReview(false)}
                    className="btn btn-outline w-full font-semibold py-2"
                    disabled={loading}
                  >
                    Back to Form
                  </button>
                </>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                ✓ Secure • ✓ Encrypted • ✓ Verified
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Ensure order includes payment method and transfer reference in review/submit */}
    </div>
  )

  if (paypalOptions) {
    return (
      <PayPalScriptProvider options={paypalOptions}>
        {checkoutContent}
      </PayPalScriptProvider>
    )
  }

  return checkoutContent
}

export default Checkout
