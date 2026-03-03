import express from 'express'
import { body, validationResult } from 'express-validator'
import admin from '../config/firebase.js'

const router = express.Router()
const db = admin.firestore()

router.post(
  '/register',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('careType').trim().notEmpty().withMessage('Care type is required'),
    body('message').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { firstName, lastName, email, phone, address, careType, message } = req.body

    try {
      const registrationData = {
        firstName,
        lastName,
        email,
        phone,
        address,
        careType,
        message: message || '',
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      }

      await db.collection('homecareRegistrations').add(registrationData)

      res.status(200).json({
        success: true,
        message: 'Registration submitted successfully. We will contact you soon!',
      })
    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to submit registration. Please try again later.',
      })
    }
  }
)

router.get('/registrations', async (req, res) => {
  try {
    const snapshot = await db.collection('homecareRegistrations')
      .orderBy('createdAt', 'desc')
      .get()
    
    const registrations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString()
    }))

    res.status(200).json({ success: true, registrations })
  } catch (error) {
    console.error('Error fetching registrations:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations.',
    })
  }
})

export default router
