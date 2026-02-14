import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Replace these with your Firebase project credentials
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Debug: log storage bucket used by the client to help diagnose upload permission errors
try {
  const bucket = firebaseConfig.storageBucket || '<missing>'
  console.log('Firebase initialized. Storage bucket:', bucket)
  if (!bucket || bucket.includes('YOUR_') || bucket.includes('your_project')) {
    console.warn('Firebase storage bucket looks like a placeholder — set VITE_FIREBASE_STORAGE_BUCKET in client/.env or environment variables')
  }
} catch (e) {
  console.warn('Could not log Firebase storage bucket:', e && e.message ? e.message : e)
}

export default app
