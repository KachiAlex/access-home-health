import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../hooks/useOrders'

const OrderHistory = () => {
  const { user } = useAuth()
  const { orders, loading, error } = useOrders(user?.uid)

  if (!user) return <p className="p-6">Please log in to view your orders.</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">Error loading orders.</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{new Date(order.createdAt?.toDate?.() || order.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total?.toFixed?.(2) || order.total}</p>
                  <p className="text-sm text-gray-600">Status: {order.status || 'Pending'}</p>
                </div>
              </div>

              <div className="mt-3">
                <ul className="list-disc pl-5 text-sm">
                  {order.items?.map((it, i) => (
                    <li key={i}>{it.name} × {it.quantity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderHistory
