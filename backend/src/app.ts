import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import userRouter from './routes/user.route'
import bugRouter from './routes/bug.route'

import errorHandler from './middlewares/error-handler'
import unknownEndpoint from './middlewares/unknown-endpoint'
import path from 'path'

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

app.use(cors())

// app.get('/', (_req: Request, res: Response) => {
//   res.send('Hello World!')
// })

app.get('/health', (_req: Request, res: Response) => {
  res.send('OK')
})

app.use('/api/users', userRouter)
app.use('/api/bugs', bugRouter)

// React App
app.use(
  express.static(path.join(__dirname, '../../frontend/dist'), {
    setHeaders(res, filePath) {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
      res.setHeader('X-Content-Type-Options', 'nosniff')

      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
        res.setHeader('Pragma', 'no-cache')
        res.setHeader('Expires', '0')
      } else {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      }
    }
  })
)

app.use((req: Request, res: Response, next) => {
  if (req.path.startsWith('/api')) {
    return next()
  }

  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

app.use(errorHandler)
app.use(unknownEndpoint)

export default app
