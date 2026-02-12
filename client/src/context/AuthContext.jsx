import { createContext, useState, useEffect } from 'react'
import { auth } from '../config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { isAdminEmail } from '../utils/adminSetup'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState('customer') // 'customer' or 'admin'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      // Check if user email is in admin list
      setUserRole(isAdminEmail(currentUser?.email) ? 'admin' : 'customer')
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setUserRole('customer')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, userRole, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
