import { NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import logger from '../utils/logger'
import JsonResponse from '../utils/json-response'

interface ErrorType extends Error {
  statusCode?: number
  code?: string
  details?: { message: string }[]
}

const getErrorResponse = (err: ErrorType) => {
  const types: Record<string, { statusCode: number; message: string }> = {
    JsonWebTokenError: {
      statusCode: 403,
      message: 'invalid token'
    },
    TokenExpiredError: {
      statusCode: 403,
      message: 'token expired'
    },
    HttpError: {
      statusCode: err.statusCode || 400,
      message: err.message
    },
    default: {
      statusCode: err.statusCode || 500,
      message: 'internal server error'
    }
  }

  return types[err.name] || types['default']
}

const getPrismaErrorResponse = (err: Prisma.PrismaClientKnownRequestError) => {
  switch (err.code) {
    case 'P2002':
      return {
        statusCode: 409,
        message: 'A record with this value already exists'
      }
    case 'P2025':
      return {
        statusCode: 404,
        message: 'Record not found'
      }
    case 'P2003':
      return {
        statusCode: 400,
        message: 'Related record not found'
      }
    case 'P2014':
      return {
        statusCode: 400,
        message: 'Invalid ID provided'
      }
    default:
      return {
        statusCode: 500,
        message: 'Database error occurred'
      }
  }
}

const errorHandler = (
  err: ErrorType | Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientValidationError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Logging
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    logger.error('Prisma Error ->', err.message)
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    logger.error('Prisma Validation Error ->', err.message)
  } else {
    logger.error('Error ->', err.message)
  }

  let statusCode: number
  let message: string

  // Handle different error types
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const response = getPrismaErrorResponse(err)
    statusCode = response.statusCode
    message = response.message
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400
    message = 'Validation error occurred'
  } else {
    const response = getErrorResponse(err as ErrorType)
    statusCode = response.statusCode
    message = response.message
  }

  return res.status(statusCode).json(new JsonResponse({ status: 'error', message }))
}

export default errorHandler
