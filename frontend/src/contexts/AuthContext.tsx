import { useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import { validateToken } from '../services/user'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  setUser: Dispatch<SetStateAction<User | null>>
  clearAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const queryClient = useQueryClient()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const userData = await validateToken()
      setUser(userData)
    } catch {
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const clearAuth = () => {
    localStorage.removeItem('token')
    setUser(null)
    queryClient.clear()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        clearAuth,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}
