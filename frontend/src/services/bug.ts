import axios from 'axios'
import { getToken } from '../lib/utils'
import type { CreateBugSchema, UpdateBugSchema } from '../schemas/bug.schema'

const baseUrl = '/api/bugs'

export const createBug = async (bug: CreateBugSchema) => {
  const res = await axios.post(`${baseUrl}`, bug, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const getAllBugs = async (filters: { status?: string; severity?: string }) => {
  const res = await axios.get(`${baseUrl}?status=${filters.status}&severity=${filters.severity}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const getMyBugs = async () => {
  const res = await axios.get(`${baseUrl}/my-bugs`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const getBug = async (id: string) => {
  const res = await axios.get(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const updateBug = async (id: string, bug: UpdateBugSchema) => {
  const res = await axios.put(`${baseUrl}/${id}`, bug, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const deleteBug = async (id: string) => {
  const res = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}
