// Admin account setup utility
// This file contains utilities for setting up and managing admin accounts

export const ADMIN_CREDENTIALS = {
  email: 'admin@accesshomehealthsupplies.com',
  password: 'admin123',
}

// List of admin emails - you can add more admins here
export const ADMIN_EMAILS = [
  'admin@accesshomehealthsupplies.com',
  'admin@accesshealth.com',
]

// Check if an email belongs to an admin account
export const isAdminEmail = (email) => {
  return ADMIN_EMAILS.includes(email?.toLowerCase())
}

// Get admin setup instructions
export const getAdminSetupInstructions = () => {
  return `
Admin Account Setup:

Email: ${ADMIN_CREDENTIALS.email}
Password: ${ADMIN_CREDENTIALS.password}

This is a test admin account. In production:
1. Change the password immediately
2. Use environment variables for credentials
3. Implement proper admin role management in Firestore
4. Use Firebase Cloud Functions for authorization

Access the Admin Dashboard at: /admin
  `
}
