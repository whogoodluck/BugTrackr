import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import Loading from './Loading'

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) return <Loading />

  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) return <Loading />

  if (!isAuthenticated) {
    return <Navigate to='/signin' replace />
  }

  return <>{children}</>
}

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, loading } = useAuthContext()

  if (loading) return <Loading />

  if (!isAuthenticated) {
    return <Navigate to='/signin' replace />
  }

  if (!isAdmin) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}
