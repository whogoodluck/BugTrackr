import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import userService from '../services/user.service'
import { HttpError } from '../utils/http-error'
import config from '../utils/config'
import { Role } from '@prisma/client'

export interface JWTPayload {
  id: string
  email: string
  role: string
}

export interface ExpressRequest extends Request {
  user?: JWTPayload
}

async function authenticateToken(
  req: ExpressRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      throw new HttpError(401, 'Access token is required')
    }

    const decoded = jwt.verify(token, config.JWT_SECRET!) as JWTPayload

    const user = await userService.getOneByEmail(decoded.email)

    if (!user) {
      throw new HttpError(401, 'Invalid or expired token')
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    next()
  } catch (err) {
    next(err)
  }
}

function requireAdmin(req: ExpressRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    throw new HttpError(401, 'Authentication required')
  }

  if (req.user.role !== Role.ADMIN) {
    throw new HttpError(403, 'Admin access required')
  }

  next()
}

export default {
  authenticateToken,
  requireAdmin
}
