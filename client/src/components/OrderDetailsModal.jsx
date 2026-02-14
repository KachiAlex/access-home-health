import React from 'react'
import { FaTimes } from 'react-icons/fa'

const OrderDetailsModal = ({ order, open, onClose }) => {
  if (!open || !order) return null

  const items = order.items || []

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded hover:bg-gray-100">
          <FaTimes />
        </button>
        <h3 className="text-2xl font-bold mb-4">Order Details — #{order.id}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold">Customer</h4>
            <p className="text-sm text-gray-700">{order.customerName}</p>
            <p className="text-sm text-gray-700">{order.customerEmail}</p>
            <p className="text-sm text-gray-700">{order.customerPhone}</p>
            <p className="mt-2 text-sm">Delivery Address:</p>
            <p className="text-sm text-gray-700">{order.address || '—'}</p>
          </div>

          <div>
            <h4 className="font-semibold">Summary</h4>
            <p className="text-sm text-gray-700">Status: <span className="font-medium">{order.status}</span></p>
            <p className="text-sm text-gray-700">Total: <span className="font-medium">${(order.total||0).toFixed(2)}</span></p>
            <p className="text-sm text-gray-700">Date: {order.date}</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Items</h4>
          <div className="space-y-2">
            {items.length === 0 ? (
              <p className="text-sm text-gray-500">No items recorded.</p>
            ) : (
              items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{it.name || it.title || 'Product'}</p>
                    <p className="text-sm text-gray-600">Qty: {it.quantity || 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${((it.price||0) * (it.quantity||1)).toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsModal
