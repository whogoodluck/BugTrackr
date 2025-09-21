import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  const token = localStorage.getItem('token')

  return token
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatTimeAgo(date: Date) {
  const now = new Date()

  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const units = [
    { label: 'y', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
    { label: 's', seconds: 1 },
  ]

  for (const unit of units) {
    if (seconds >= unit.seconds) {
      const value = Math.floor(seconds / unit.seconds)
      return `${value}${unit.label}`
    }
  }

  return 'just now'
}
