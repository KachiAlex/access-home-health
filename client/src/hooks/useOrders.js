import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

export function useOrders(userId) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) {
      setOrders([])
      setLoading(false)
      return
    }

    const fetchOrders = async () => {
      setLoading(true)
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        )
        const snap = await getDocs(q)
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        setOrders(list)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [userId])

  return { orders, loading, error }
}

export default useOrders
