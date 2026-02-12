import React, { useEffect, useState } from 'react'
import { fetchEvents } from '../services/analyticsService'

const AdminAnalytics = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const ev = await fetchEvents()
      setEvents(ev)
      setLoading(false)
    }
    load()
  }, [])

  const counts = events.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1
    return acc
  }, {})

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.keys(counts).map((k) => (
              <div key={k} className="bg-white p-4 rounded shadow">
                <p className="text-sm text-gray-500">{k}</p>
                <p className="text-2xl font-bold">{counts[k]}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-3">Recent Events</h3>
            <ul className="text-sm space-y-2 max-h-72 overflow-y-auto">
              {events.map((e) => (
                <li key={e.id} className="border-b py-2">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{e.type}</div>
                      <div className="text-xs text-gray-500">{JSON.stringify(e.payload)}</div>
                    </div>
                    <div className="text-xs text-gray-400">{new Date(e.createdAt?.toDate?.() || e.createdAt).toLocaleString()}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminAnalytics
