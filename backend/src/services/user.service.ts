import { User } from '@prisma/client'
import { prisma } from '../lib/prisma'

async function createNewUser(data: User) {
  const user = await prisma.user.create({
    data: data
  })
  return user
}

async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}

export default {
  createNewUser,
  getAllUsers
}
