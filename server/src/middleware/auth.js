import { auth } from '../config/firebase.js'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decodedToken = await auth.verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decodedToken = await auth.verifyIdToken(token)
    
    // Check if user has admin role (in a real app, check Firestore)
    const userRecord = await auth.getUser(decodedToken.uid)
    
    if (!userRecord.customClaims || !userRecord.customClaims.admin) {
      return res.status(403).json({ error: 'Not authorized' })
    }

    req.user = decodedToken
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
