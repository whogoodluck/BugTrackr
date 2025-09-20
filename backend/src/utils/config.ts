import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 3002

const NODE_ENV = process.env.NODE_ENV

const DATABASE_URL = process.env.DATABASE_URL
const DEV_DATABASE_URL = process.env.DEV_DATABASE_URL

const JWT_SECRET = process.env.JWT_SECRET

export default {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  DEV_DATABASE_URL,
  JWT_SECRET
}
