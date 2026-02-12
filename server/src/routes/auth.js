import express from 'express'
import { auth } from '../config/firebase.js'

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const userRecord = await auth.createUser({
      email,
      password,
    })

    res.status(201).json({
      message: 'User registered successfully',
      uid: userRecord.uid,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Set admin role (admin only)
router.post('/:uid/set-admin', async (req, res) => {
  try {
    const { uid } = req.params

    await auth.setCustomUserClaims(uid, { admin: true })

    res.json({ message: 'Admin role set successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user by ID
router.get('/:uid', async (req, res) => {
  try {
    const userRecord = await auth.getUser(req.params.uid)
    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      customClaims: userRecord.customClaims,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
