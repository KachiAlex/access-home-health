import express from 'express'
import { body, validationResult } from 'express-validator'
import { verifyToken } from '../middleware/auth.js'
import { db } from '../config/firebase.js'
import { verifyPaystackTransaction } from '../utils/paystackClient.js'

const router = express.Router()

const handleValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

router.post(
  '/verify-transaction',
  [
    body('reference').notEmpty().withMessage('reference is required'),
    body('orderData').isObject().withMessage('orderData is required'),
    body('orderData.total').optional().isFloat({ gt: 0 }).withMessage('orderData.total must be a positive number'),
    body('orderData.items').optional().isArray(),
  ],
  handleValidation,
  async (req, res) => {
    try {
      const { reference, orderData } = req.body
      const transaction = await verifyPaystackTransaction(reference)

      if (!transaction || transaction.status !== 'success') {
        return res.status(400).json({ error: 'Paystack transaction not successful', details: transaction })
      }

      const amountFromPaystack = Number(transaction.amount || 0) / 100
      const resolvedTotal = amountFromPaystack || Number(orderData.total) || 0

      const firestoreOrder = {
        items: orderData.items || [],
        total: resolvedTotal,
        userId: orderData.userId || null,
        email: orderData.email || transaction.customer?.email || null,
        customerName:
          orderData.customerName || transaction.customer?.name || `${transaction.customer?.first_name || ''} ${transaction.customer?.last_name || ''}`.trim(),
        phone: orderData.phone || transaction.customer?.phone || null,
        shipping: orderData.shipping || null,
        paymentMethod: 'paystack',
        status: 'Paid',
        paystackReference: transaction.reference,
        paystackResponse: transaction,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const docRef = await db.collection('orders').add(firestoreOrder)

      res.json({ success: true, orderId: docRef.id, order: firestoreOrder })
    } catch (error) {
      console.error('Paystack verify error:', error.response?.data || error.message)
      res.status(500).json({ error: 'Failed to verify Paystack transaction' })
    }
  }
)

export default router
