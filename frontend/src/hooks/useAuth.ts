import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuthContext } from '../contexts/AuthContext'
import { login, logout, register } from '../services/user'

export function useLogin() {
  const navigate = useNavigate()
  const { setUser } = useAuthContext()

  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      localStorage.setItem('token', data.data.token)
      setUser(data.data.user)
      navigate('/home')
      toast.success('Login successful!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || error.message)
    },
  })
}

export function useRegister() {
  const navigate = useNavigate()
  const { setUser } = useAuthContext()

  return useMutation({
    mutationFn: register,
    onSuccess: data => {
      localStorage.setItem('token', data.data.token)
      setUser(data.data.user)
      navigate('/home')
      toast.success('Registration successful!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || error.message)
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()
  const { clearAuth } = useAuthContext()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth()
      navigate('/signin')
      toast.success('Logged out successfully')
    },
  })
}
