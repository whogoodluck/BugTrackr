import axios from 'axios'
import { getToken } from '../lib/utils'
import type { SignInFormData, SignUpFormData } from '../schemas/user.schema'

const baseUrl = '/api/users'

export const register = async (user: SignUpFormData) => {
  const res = await axios.post(`${baseUrl}/register`, user)

  return res.data
}

export const login = async (credentials: SignInFormData) => {
  const res = await axios.post(`${baseUrl}/login`, credentials)

  return res.data
}

export const logout = async () => {
  const res = await axios.post(`${baseUrl}/logout`, null, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const validateToken = async () => {
  const res = await axios.get(`${baseUrl}/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}
