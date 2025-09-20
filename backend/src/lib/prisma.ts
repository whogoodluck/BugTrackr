import { PrismaClient } from '@prisma/client'
import config from '../utils/config'

const NODE_ENV = config.NODE_ENV
const DATABASE_URL = config.DATABASE_URL
const DEV_DATABASE_URL = config.DEV_DATABASE_URL

if (NODE_ENV === 'production' && !DATABASE_URL) {
  throw new Error('⚠️ DATABASE_URL is not defined in environment variables')
}

if (NODE_ENV !== 'production' && !DEV_DATABASE_URL) {
  throw new Error('⚠️ DEV_DATABASE_URL is not defined in environment variables')
}

const dbUrl = NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl
    }
  }
})
