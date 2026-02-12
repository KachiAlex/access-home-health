import express from 'express'
import { db } from '../config/firebase.js'
import { verifyToken, verifyAdmin } from '../middleware/auth.js'

const router = express.Router()

// Get all orders (admin only)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').get()
    const orders = []
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() })
    })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user's orders
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const snapshot = await db
      .collection('orders')
      .where('userId', '==', req.params.userId)
      .orderBy('createdAt', 'desc')
      .get()

    const orders = []
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() })
    })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, total, shippingAddress, paymentMethod } = req.body

    if (!items || items.length === 0 || !total || !shippingAddress) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const docRef = await db.collection('orders').add({
      userId: req.user.uid,
      items,
      total: parseFloat(total),
      shippingAddress,
      paymentMethod,
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    res.status(201).json({ id: docRef.id, message: 'Order created successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update order status (admin only)
router.put('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ error: 'Status is required' })
    }

    await db.collection('orders').doc(req.params.id).update({
      status,
      updatedAt: new Date(),
    })

    res.json({ message: 'Order status updated successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
