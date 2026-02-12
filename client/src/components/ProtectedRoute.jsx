import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children, requireEmailVerified = false }) => {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireEmailVerified && !user.emailVerified) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
