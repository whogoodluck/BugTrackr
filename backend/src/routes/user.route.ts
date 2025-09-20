import { Router } from 'express'
import userController from '../controllers/user.controller'
import authMiddleware from '../middlewares/auth'

const userRouter = Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)

userRouter.get('/me', authMiddleware.authenticateToken, userController.validateToken)
userRouter.post('/logout', authMiddleware.authenticateToken, userController.logout)

userRouter.get(
  '/',
  authMiddleware.authenticateToken,
  authMiddleware.requireAdmin,
  userController.getUsers
)

export default userRouter
