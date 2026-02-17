import express from 'express'
import { body, validationResult } from 'express-validator'
import { createPayPalOrder, capturePayPalOrder } from '../utils/paypalClient.js'
import { db } from '../config/firebase.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

const handleValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

router.post(
  '/create-order',
  verifyToken,
  [
    body('amount').isFloat({ gt: 0 }).withMessage('amount must be a positive number'),
    body('currency').optional().isString(),
    body('description').optional().isString(),
    body('items').optional().isArray(),
  ],
  handleValidation,
  async (req, res) => {
    try {
      const { amount, currency = 'USD', description, items = [] } = req.body
      const order = await createPayPalOrder({ amount: Number(amount), currency, description, items })
      res.json({ id: order.id, status: order.status })
    } catch (error) {
      console.error('PayPal create order error:', error.response?.data || error.message)
      res.status(500).json({ error: 'Failed to create PayPal order' })
    }
  }
)

router.post(
  '/capture-order',
  verifyToken,
  [
    body('orderId').notEmpty().withMessage('orderId is required'),
    body('orderData').isObject().withMessage('orderData is required'),
    body('orderData.total').optional().isFloat({ gt: 0 }).withMessage('orderData.total must be a positive number'),
    body('orderData.items').optional().isArray(),
  ],
  handleValidation,
  async (req, res) => {
    try {
      const { orderId, orderData } = req.body
      const capture = await capturePayPalOrder(orderId)
      const purchaseUnit = capture.purchase_units?.[0]
      const captureDetails = purchaseUnit?.payments?.captures?.[0]

      if (capture.status !== 'COMPLETED') {
        return res.status(400).json({ error: 'PayPal order not completed', details: capture })
      }

      const capturedTotal = Number(captureDetails?.amount?.value) || 0
      const firestoreOrder = {
        items: orderData.items || [],
        total: capturedTotal || Number(orderData.total) || 0,
        userId: req.user?.uid || orderData.userId || null,
        email: orderData.email || capture.payer?.email_address || null,
        customerName:
          orderData.customerName || `${capture.payer?.name?.given_name || ''} ${capture.payer?.name?.surname || ''}`.trim(),
        phone: orderData.phone || null,
        shipping: orderData.shipping || null,
        paymentMethod: 'paypal',
        status: 'Paid',
        paypalOrderId: orderId,
        paypalCaptureId: captureDetails?.id || null,
        paypalAmount: captureDetails?.amount || null,
        paypalPayer: capture.payer || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const docRef = await db.collection('orders').add(firestoreOrder)

      res.json({ success: true, orderId: docRef.id, captureId: captureDetails?.id, order: firestoreOrder })
    } catch (error) {
      console.error('PayPal capture order error:', error.response?.data || error.message)
      res.status(500).json({ error: 'Failed to capture PayPal order' })
    }
  }
)

export default router
