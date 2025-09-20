import axios from 'axios'

const baseUrl = '/api/users'

export const getToken = () => {
  const token = localStorage.getItem('token')

  return token
}

export const register = async (user: { email: string; name: string; password: string }) => {
  const res = await axios.post(`${baseUrl}/register`, user)

  return res.data
}

export const login = async (credentials: { email: string; password: string }) => {
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

  if (res.statusText !== 'OK') {
    throw new Error('Invalid token')
  }

  return res.data
}
