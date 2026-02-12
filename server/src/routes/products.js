import express from 'express'
import { db } from '../config/firebase.js'
import { verifyAdmin } from '../middleware/auth.js'

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('products').get()
    const products = []
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() })
    })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('products').doc(req.params.id).get()
    if (!doc.exists) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json({ id: doc.id, ...doc.data() })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create product (admin only)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body

    if (!name || !price || !stock) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const docRef = await db.collection('products').add({
      name,
      price: parseFloat(price),
      description,
      category,
      stock: parseInt(stock),
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    res.status(201).json({ id: docRef.id, message: 'Product created successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update product (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body

    await db.collection('products').doc(req.params.id).update({
      name,
      price: parseFloat(price),
      description,
      category,
      stock: parseInt(stock),
      image,
      updatedAt: new Date(),
    })

    res.json({ message: 'Product updated successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete product (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await db.collection('products').doc(req.params.id).delete()
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
