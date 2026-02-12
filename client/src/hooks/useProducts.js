import { useState, useEffect } from 'react'
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
} from '../services/productService'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAddProduct = async (product) => {
    try {
      const newProduct = await addProduct(product)
      setProducts([...products, newProduct])
      return newProduct
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const handleUpdateProduct = async (id, product) => {
    try {
      await updateProduct(id, product)
      setProducts(
        products.map(p => (p.id === id ? { id, ...product } : p))
      )
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id)
      setProducts(products.filter(p => p.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const handleSeedProducts = async (seedData) => {
    try {
      await seedProducts(seedData)
      await fetchProducts()
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
    refetch: fetchProducts,
  }
}
