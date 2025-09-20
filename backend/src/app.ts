import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import userRouter from './routes/user.route'

import errorHandler from './middlewares/error-handler'
import unknownEndpoint from './middlewares/unknown-endpoint'

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

app.use(cors())

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/health', (_req: Request, res: Response) => {
  res.send('OK')
})

app.use('/api/users', userRouter)

app.use(errorHandler)
app.use(unknownEndpoint)

export default app
