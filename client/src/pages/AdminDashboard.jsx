import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaSave,
  FaTimes,
  
} from 'react-icons/fa'
import ProductEditModal from '../components/ProductEditModal'
import OrderDetailsModal from '../components/OrderDetailsModal'
import { useSettings } from '../hooks/useSettings'
import PasswordChangeForm from '../components/PasswordChangeForm'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useProducts } from '../hooks/useProducts'

const AdminDashboard = () => {
  
  const { user, userRole, loading } = useAuth()
  const { settings, updateSettings } = useSettings()
  const {
    products,
    loading: productsLoading,
    error: productsError,
    addProduct,
    updateProduct,
    deleteProduct,
    
  } = useProducts()

  const [activeTab, setActiveTab] = useState('products')
  const [orders, setOrders] = useState([])
  const [facebookAppId, setFacebookAppId] = useState(settings?.facebookAppId || '')
  const [sendGridKey, setSendGridKey] = useState(settings?.sendGridKey || '')
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    category: 'medical',
    image: '',
    imageFile: null,
    // Local preview URL for immediate preview when admin selects a file
    previewUrl: '',
  })
  const prevPreviewRef = useRef(null)
  

  console.debug('AdminDashboard render', { loading, userRole, activeTab })

  // Wait for auth to resolve; then redirect if not admin
  if (!loading && userRole !== 'admin') {
    return <Navigate to="/" />
  }

  // Update Facebook App ID when settings load
  useEffect(() => {
    if (settings?.facebookAppId) {
      setFacebookAppId(settings.facebookAppId)
    }
    if (settings?.sendGridKey) {
      setSendGridKey(settings.sendGridKey)
    }
  }, [settings])

  // Revoke previous object URL when previewUrl changes to avoid memory leaks
  useEffect(() => {
    const prev = prevPreviewRef.current
    if (prev && prev.startsWith && prev.startsWith('blob:') && prev !== newProduct.previewUrl) {
      try { URL.revokeObjectURL(prev) } catch (err) {}
    }
    prevPreviewRef.current = newProduct.previewUrl
    return () => {
      const cur = prevPreviewRef.current
      if (cur && cur.startsWith && cur.startsWith('blob:')) {
        try { URL.revokeObjectURL(cur) } catch (err) {}
      }
    }
  }, [newProduct.previewUrl])

  // Fetch recent orders from Firestore
  // Fetch orders only when admin viewing the Orders tab and auth has settled.
  useEffect(() => {
    if (loading) return
    if (userRole !== 'admin') return
    if (activeTab !== 'orders') return

    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error('Error fetching orders:', err)
      }
    }

    fetchOrders()
  }, [loading, userRole, activeTab])

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const productData = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        description: newProduct.description || '',
        category: newProduct.category || 'medical',
        image: newProduct.image || '',
      }

      // If admin selected a file, attach it for upload handling in productService
      if (newProduct.imageFile) productData.imageFile = newProduct.imageFile

      // Always add here; editing is handled in a modal to avoid scrolling
      await addProduct(productData)
      alert('Product added successfully!')

      setNewProduct({
        name: '',
        price: '',
        stock: '',
        description: '',
        category: 'medical',
        image: '',
        imageFile: null,
        previewUrl: '',
      })
    } catch (error) {
      alert(`Error saving product: ${error.message}`)
    }
  }

  // Modal editing state
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [modalProduct, setModalProduct] = useState(null)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const handleOpenAddModal = () => {
    setModalProduct({
      id: null,
      name: '',
      price: '',
      stock: '',
      description: '',
      category: 'medical',
      image: '',
    })
    setEditModalOpen(true)
  }

  const handleEditProduct = (product) => {
    setModalProduct(product)
    setEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setEditModalOpen(false)
    setModalProduct(null)
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        alert('Product deleted successfully!')
      } catch (error) {
        alert(`Error deleting product: ${error.message}`)
      }
    }
  }

  const handleModalSave = async (productId, productData) => {
    try {
      if (productId) {
        await updateProduct(productId, productData)
        alert('Product updated successfully!')
      } else {
        await addProduct(productData)
        alert('Product added successfully!')
      }
      handleCloseModal()
    } catch (err) {
      alert(`Error saving product: ${err.message}`)
    }
  }

  const handleSaveSettings = async (e) => {
    e.preventDefault()
    const result = await updateSettings({ facebookAppId, sendGridKey })
    if (result.success) {
      setSettingsSaved(true)
      setTimeout(() => setSettingsSaved(false), 3000)
      alert('Settings saved successfully!')
    } else {
      alert(`Error saving settings: ${result.error}`)
    }
  }

  const handleRemoveSendGridKey = async () => {
    if (!window.confirm('Remove SendGrid key from app settings? This will NOT remove any function config.')) return
    try {
      const result = await updateSettings({ sendGridKey: '' })
      if (result.success) {
        setSendGridKey('')
        alert('SendGrid key removed from app settings.')
      } else {
        alert('Failed to remove SendGrid key')
      }
    } catch (err) {
      console.error(err)
      alert('Error removing SendGrid key')
    }
  }

  

  return (
    <div id="admin-dashboard-root" className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {user?.email}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaBox className="text-blue-600 text-4xl mr-4" />
              <div>
                <p className="text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaShoppingCart className="text-green-600 text-4xl mr-4" />
              <div>
                <p className="text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaUsers className="text-purple-600 text-4xl mr-4" />
              <div>
                <p className="text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b flex flex-wrap">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'products'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Products Management
            </button>
            {/* Seed tab removed */}
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'orders'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-6 py-4 font-semibold transition flex items-center justify-center space-x-2 ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaCog size={16} />
              <span>Settings</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'products' && (
              <div>
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Products Management</h2>
                    <button onClick={handleOpenAddModal} className="btn btn-primary flex items-center space-x-2">
                      <FaPlus />
                      <span>Add Product</span>
                    </button>
                  </div>

                {/* Edit modal (opened by Edit button in list) */}
                <ProductEditModal
                  product={modalProduct}
                  open={editModalOpen}
                  onClose={handleCloseModal}
                  onSave={handleModalSave}
                />

                {/* Products Table */}
                {productsLoading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Loading products...</p>
                  </div>
                ) : productsError ? (
                  <div className="text-center py-12">
                    <p className="text-red-500 text-lg">Error: {productsError}</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products yet. Add your first product above.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left">Product Name</th>
                          <th className="px-6 py-3 text-left">Category</th>
                          <th className="px-6 py-3 text-left">Price</th>
                          <th className="px-6 py-3 text-left">Stock</th>
                          <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-3 font-semibold">{product.name}</td>
                            <td className="px-6 py-3">
                              <span className="badge badge-primary">{product.category}</span>
                            </td>
                            <td className="px-6 py-3 font-semibold text-green-600">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-3">
                              <span
                                className={`badge ${
                                  product.stock > 5 ? 'badge-success' : 'badge-primary'
                                }`}
                              >
                                {product.stock} units
                              </span>
                            </td>
                            <td className="px-6 py-3 flex space-x-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="btn btn-outline px-3 py-1 flex items-center space-x-1"
                              >
                                <FaEdit size={14} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="btn btn-danger px-3 py-1 flex items-center space-x-1"
                              >
                                <FaTrash size={14} />
                                <span>Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Seed tab removed */}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No orders yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left">Order ID</th>
                          <th className="px-6 py-3 text-left">Customer</th>
                          <th className="px-6 py-3 text-left">Total</th>
                          <th className="px-6 py-3 text-left">Status</th>
                          <th className="px-6 py-3 text-left">Date</th>
                          <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-3 font-semibold">#{order.id}</td>
                            <td className="px-6 py-3">{order.customerName}</td>
                            <td className="px-6 py-3">${order.total.toFixed(2)}</td>
                            <td className="px-6 py-3">
                              <span
                                className={`badge ${
                                  order.status === 'Delivered'
                                    ? 'badge-success'
                                    : 'badge-primary'
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-3">{order.date}</td>
                            <td className="px-6 py-3">
                              <button onClick={() => { setSelectedOrder(order); setOrderModalOpen(true) }} className="text-blue-600 hover:text-blue-800 font-semibold">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <OrderDetailsModal order={selectedOrder} open={orderModalOpen} onClose={() => { setOrderModalOpen(false); setSelectedOrder(null) }} />
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">App Settings</h2>
                <form onSubmit={handleSaveSettings} className="max-w-2xl">
                  {/* Facebook App ID Setting */}
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-semibold mb-2">Facebook App ID</label>
                    <p className="text-xs text-gray-600 mb-4">
                      Enter your Facebook App ID to enable product sharing feature. Get your App ID from{' '}
                      <a
                        href="https://developers.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Facebook Developers
                      </a>
                    </p>
                    <input
                      type="text"
                      placeholder="Enter Facebook App ID"
                      value={facebookAppId}
                      onChange={(e) => setFacebookAppId(e.target.value)}
                      className="input w-full mb-4"
                    />
                    <label className="block text-sm font-semibold mb-2">SendGrid API Key (optional)</label>
                    <input
                      type="text"
                      placeholder="Enter SendGrid API Key"
                      value={sendGridKey}
                      onChange={(e) => setSendGridKey(e.target.value)}
                      className="input w-full mb-4"
                    />
                    {sendGridKey && (
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-yellow-700">SendGrid key saved to app settings. For best security, set via Firebase functions config instead.</p>
                        <button
                          onClick={handleRemoveSendGridKey}
                          className="btn btn-outline ml-3"
                        >
                          Remove Key
                        </button>
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center space-x-2"
                    >
                      <FaSave size={16} />
                      <span>Save Settings</span>
                    </button>
                    {settingsSaved && (
                      <p className="text-green-600 text-sm mt-4 font-semibold">✓ Settings saved successfully!</p>
                    )}
                  </div>
                </form>

                {/* Admin password change */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg max-w-2xl">
                  <h3 className="text-lg font-semibold mb-4">Change Admin Password</h3>
                  <p className="text-sm text-gray-600 mb-4">Admins can change their account password here.</p>
                  <PasswordChangeForm />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
