import { useState, useEffect } from 'react'
import {
  addProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
} from '../services/productService'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const productsCollection = collection(db, 'products')
    const q = query(productsCollection, orderBy('name', 'asc'))
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
        setError(null)
        setLoading(false)
      },
      (err) => {
        setError(err.message || String(err))
        setLoading(false)
      }
    )

    return () => unsub()
  }, [])

  const handleAddProduct = async (product) => {
    try {
      const newProduct = await addProduct(product)
      return newProduct
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const handleUpdateProduct = async (id, product) => {
    try {
      await updateProduct(id, product)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const handleSeedProducts = async (seedData) => {
    try {
      await seedProducts(seedData)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    products,
    loading,
    error,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    seedProducts: handleSeedProducts,
  }
}
