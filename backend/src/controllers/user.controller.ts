import { NextFunction, Request, Response } from 'express'
import { loginSchema, registerSchema } from '../schemas/user.schema'
import userService from '../services/user.service'
import { HttpError } from '../utils/http-error'
import JsonResponse from '../utils/json-response'
import { ExpressRequest } from '@/middlewares/auth'

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = registerSchema.parse(req.body)

    const existingUser = await userService.getOneByEmail(email)

    if (existingUser) {
      throw new HttpError(400, 'User already exists')
    }

    const hashedPassword = await userService.hashPassword(password)

    const user = await userService.createNewUser({ email, name, password: hashedPassword })

    const token = userService.signToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    const { password: _, ...userWithoutPassword } = user

    res.status(201).json(
      new JsonResponse({
        status: 'success',
        message: 'User created successfully',
        data: { user: userWithoutPassword, token }
      })
    )
  } catch (err) {
    next(err)
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await userService.getOneByEmail(email)

    if (!user) {
      throw new HttpError(401, 'Invalid email or password')
    }

    const isValidPassword = await userService.verifyPassword(password, user.password)

    if (!isValidPassword) {
      throw new HttpError(401, 'Invalid email or password')
    }

    const token = userService.signToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    const { password: _, ...userWithoutPassword } = user

    res.status(200).json(
      new JsonResponse({
        status: 'success',
        message: 'User logged in successfully',
        data: { user: userWithoutPassword, token }
      })
    )
  } catch (err) {
    next(err)
  }
}

function logout(req: ExpressRequest, res: Response) {
  if (!req.user) {
    throw new HttpError(401, 'Authentication required')
  }

  res
    .status(200)
    .json(new JsonResponse({ status: 'success', message: 'User logged out successfully' }))
}

async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAllUsers()
    res
      .status(200)
      .json(
        new JsonResponse({ status: 'success', message: 'Users fetched successfully', data: users })
      )
  } catch (err) {
    next(err)
  }
}

export default {
  register,
  login,
  logout,
  getUsers
}
