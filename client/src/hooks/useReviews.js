import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'

export function useReviews(productId) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchReviews = async () => {
    if (!productId) return
    setLoading(true)
    try {
      const q = query(
        collection(db, 'reviews'),
        where('productId', '==', productId),
        orderBy('createdAt', 'desc')
      )
      const snap = await getDocs(q)
      setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const addReview = async ({ productId, userId, rating, text }) => {
    const docRef = await addDoc(collection(db, 'reviews'), {
      productId,
      userId,
      rating,
      text,
      createdAt: serverTimestamp(),
    })
    // refresh list after adding
    await fetchReviews()
    return docRef.id
  }

  return { reviews, loading, error, addReview, refetch: fetchReviews }
}

export default useReviews
