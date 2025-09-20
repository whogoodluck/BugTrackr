import { Router } from 'express'
import userController from '../controllers/user.controller'
import authMiddleware from '../middlewares/auth'

const userRouter = Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)

userRouter.use(authMiddleware.authenticateToken)
userRouter.post('/logout', userController.logout)

userRouter.use(authMiddleware.requireAdmin)
userRouter.get('/', userController.getUsers)

export default userRouter
