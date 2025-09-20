import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { RegisterSchema } from '@/schemas/user.schema'
import config from '@/utils/config'
import { JWTPayload } from '../middlewares/auth'

async function hashPassword(password: string) {
  const saltRounds = 10

  return await bcrypt.hash(password, saltRounds)
}

async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

function signToken(data: JWTPayload) {
  const token = jwt.sign(data, config.JWT_SECRET!, {
    expiresIn: '7d'
  })

  return token
}

function verifyToken(token: string) {
  const decoded = jwt.verify(token, config.JWT_SECRET!) as JWTPayload

  return decoded
}

async function createNewUser(data: RegisterSchema) {
  const user = await prisma.user.create({
    data: data
  })

  return user
}

async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return users
}

async function getOneById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  return user
}

async function getOneByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  return user
}

export default {
  hashPassword,
  verifyPassword,
  signToken,
  verifyToken,
  createNewUser,
  getAllUsers,
  getOneById,
  getOneByEmail
}
