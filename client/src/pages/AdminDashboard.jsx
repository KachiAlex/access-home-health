import { useState, useEffect } from 'react'
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
  FaDownload,
  FaTimes,
  FaCheck,
} from 'react-icons/fa'
import { useSettings } from '../hooks/useSettings'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useProducts } from '../hooks/useProducts'
import { PRODUCTS_SEED } from '../data/productsSeed'

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
    seedProducts,
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
  })
  const [seeding, setSeeding] = useState(false)
  const [seedSuccess, setSeedSuccess] = useState(false)

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

  // Fetch recent orders from Firestore
  useEffect(() => {
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
  }, [])

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
        image: newProduct.image || 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=400&fit=crop',
      }

      // If admin selected a file, attach it for upload handling in productService
      if (newProduct.imageFile) productData.imageFile = newProduct.imageFile

      if (editingId) {
        await updateProduct(editingId, productData)
        alert('Product updated successfully!')
        setEditingId(null)
      } else {
        await addProduct(productData)
        alert('Product added successfully!')
      }

      setNewProduct({
        name: '',
        price: '',
        stock: '',
        description: '',
        category: 'medical',
        image: '',
        imageFile: null,
      })
    } catch (error) {
      alert(`Error saving product: ${error.message}`)
    }
  }

  const handleEditProduct = (product) => {
    setEditingId(product.id)
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || '',
      category: product.category || 'medical',
      image: product.image || '',
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setNewProduct({
      name: '',
      price: '',
      stock: '',
      description: '',
      category: 'medical',
      image: '',
    })
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

  const handleSeedProducts = async () => {
    if (
      window.confirm(
        `This will add ${PRODUCTS_SEED.length} products to your store. Continue?`
      )
    ) {
      try {
        setSeeding(true)
        await seedProducts(PRODUCTS_SEED)
        setSeedSuccess(true)
        setTimeout(() => setSeedSuccess(false), 3000)
        alert('Products seeded successfully!')
      } catch (error) {
        alert(`Error seeding products: ${error.message}`)
      } finally {
        setSeeding(false)
      }
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
            <button
              onClick={() => setActiveTab('seed')}
              className={`flex-1 px-6 py-4 font-semibold transition flex items-center justify-center space-x-2 ${
                activeTab === 'seed'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaDownload size={16} />
              <span>Seed Data</span>
            </button>
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
                {/* Add/Edit Product Form */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">
                    {editingId ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <form onSubmit={handleAddOrUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Product Name *"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="input"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price *"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      className="input"
                      step="0.01"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Stock Quantity *"
                      value={newProduct.stock}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, stock: e.target.value })
                      }
                      className="input"
                      required
                    />
                    <select
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, category: e.target.value })
                      }
                      className="input"
                    >
                      <option value="medical">Medical Supplies</option>
                      <option value="mobility">Mobility Aids</option>
                      <option value="bedroom">Bedroom Equipment</option>
                      <option value="bathroom">Bathroom Aids</option>
                      <option value="footwear">Footwear</option>
                      <option value="braces">Braces & Support</option>
                      <option value="diagnostics">Diagnostics</option>
                      <option value="personal-care">Personal Care</option>
                    </select>
                    <input
                      type="url"
                      placeholder="Image URL"
                      value={newProduct.image}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                      }
                      className="input"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, imageFile: e.target.files?.[0] || null })
                      }
                      className="input"
                    />
                    <textarea
                      placeholder="Description"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, description: e.target.value })
                      }
                      className="input col-span-1 md:col-span-2 lg:col-span-3"
                      rows="3"
                    />
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary flex items-center justify-center space-x-2 flex-1"
                      >
                        <FaSave />
                        <span>{editingId ? 'Update Product' : 'Add Product'}</span>
                      </button>
                      {editingId && (
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="btn btn-outline flex items-center justify-center space-x-2"
                        >
                          <FaTimes />
                          <span>Cancel</span>
                        </button>
                      )}
                    </div>
                  </form>
                </div>

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
                    <p className="text-gray-500 text-lg">No products yet. Add your first product above or use Seed Data tab!</p>
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

            {activeTab === 'seed' && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold mb-6">Seed Your Catalog</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    🚀 Quick Start Your Store
                  </h3>
                  <p className="text-blue-800 mb-4">
                    This will add {PRODUCTS_SEED.length} pre-configured medical products to your store:
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-blue-800 mb-6">
                    {PRODUCTS_SEED.slice(0, 8).map((p) => (
                      <li key={p.name} className="flex items-start">
                        <FaCheck className="mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                        {p.name}
                      </li>
                    ))}
                    <li className="col-span-2 text-blue-700 font-semibold">
                      + {PRODUCTS_SEED.length - 8} more products...
                    </li>
                  </ul>
                  <p className="text-sm text-blue-700 mb-6">
                    Each product includes a name, price, stock quantity, description, and professional image from Unsplash.
                  </p>
                  <button
                    onClick={handleSeedProducts}
                    disabled={seeding || products.length > 0}
                    className={`btn ${
                      products.length > 0 ? 'bg-gray-400' : 'btn-primary'
                    } flex items-center justify-center space-x-2 w-full`}
                  >
                    <FaDownload />
                    <span>
                      {seeding
                        ? 'Seeding...'
                        : products.length > 0
                        ? 'Store Already Has Products'
                        : 'Seed All Products Now'}
                    </span>
                  </button>
                  {seedSuccess && (
                    <p className="text-green-600 text-sm mt-4 font-semibold">
                      ✓ Products seeded successfully!
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Included Products</h3>
                  <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                    {PRODUCTS_SEED.map((product) => (
                      <div
                        key={product.name}
                        className="flex items-start p-3 bg-white rounded border border-gray-200"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded mr-3 object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {product.description}
                          </p>
                          <div className="flex justify-between mt-1 text-sm">
                            <span className="text-green-600 font-semibold">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="text-gray-600">Stock: {product.stock}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
                              <button className="text-blue-600 hover:text-blue-800 font-semibold">
                                View Details
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
