import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { ADMIN_CREDENTIALS } from '../utils/adminSetup'

/**
 * Creates the default admin account
 * Run this once during initial setup
 * 
 * Usage: Call this function from the browser console or a setup page
 */
export const createAdminAccount = async () => {
  try {
    console.log('Creating admin account...')
    
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      ADMIN_CREDENTIALS.email,
      ADMIN_CREDENTIALS.password
    )
    
    console.log('✅ Admin account created successfully!')
    console.log('UID:', userCredential.user.uid)
    console.log('Email:', userCredential.user.email)
    
    return userCredential.user
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('✅ Admin account already exists!')
      return { email: ADMIN_CREDENTIALS.email }
    } else {
      console.error('❌ Error creating admin account:', error.message)
      throw error
    }
  }
}

// Log setup instructions to console
console.log(`
╔════════════════════════════════════════════════════════════════╗
║           ACCESS HOME HEALTH - ADMIN SETUP                     ║
╚════════════════════════════════════════════════════════════════╝

To create an admin account, follow these steps:

1. Open the browser console (F12 or Ctrl+Shift+I)
2. Run this command:
   
   import('http://localhost:5173/@fs/d:/accesshealth/client/src/services/setupAdmin.js')
     .then(m => m.createAdminAccount())
     .catch(e => console.error('Setup failed:', e))

OR use your Firebase credentials to log in at /login:

   Email: ${ADMIN_CREDENTIALS.email}
   Password: ${ADMIN_CREDENTIALS.password}

Once logged in, you'll have access to the Admin Dashboard at /admin

Note: Make sure Firebase is properly configured in your .env file
`)
