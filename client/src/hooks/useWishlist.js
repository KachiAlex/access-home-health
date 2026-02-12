import { useState, useEffect } from 'react'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { db } from '../config/firebase'

export function useWishlist(userId) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) {
      setItems([])
      setLoading(false)
      return
    }

    const fetch = async () => {
      setLoading(true)
      try {
        const ref = doc(db, 'wishlists', userId)
        const snap = await getDoc(ref)
        if (snap.exists()) setItems(snap.data().items || [])
        else setItems([])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [userId])

  const addToWishlist = async (product) => {
    if (!userId) throw new Error('Not authenticated')
    const ref = doc(db, 'wishlists', userId)
    try {
      await updateDoc(ref, { items: arrayUnion(product) })
    } catch (e) {
      // If doc doesn't exist, create it
      await setDoc(ref, { items: [product] })
    }
    setItems((prev) => [...prev, product])
  }

  const removeFromWishlist = async (product) => {
    if (!userId) throw new Error('Not authenticated')
    const ref = doc(db, 'wishlists', userId)
    await updateDoc(ref, { items: arrayRemove(product) })
    setItems((prev) => prev.filter((p) => p.id !== product.id))
  }

  return { items, loading, error, addToWishlist, removeFromWishlist }
}

export default useWishlist
