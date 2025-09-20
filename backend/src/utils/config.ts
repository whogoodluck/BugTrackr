import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 3002

export default {
  PORT
}
