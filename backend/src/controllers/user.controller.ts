import { Request, Response } from 'express'
import userService from '../services/user.service'
import JsonResponse from '../utils/json-response'

async function createUser(req: Request, res: Response) {
  try {
    const user = await userService.createNewUser(req.body)
    res.status(201).json(user)
  } catch (err) {
    console.error(err)
  }
}

async function getUsers(_req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers()
    res
      .status(200)
      .json(
        new JsonResponse({ status: 'success', message: 'Users fetched successfully', data: users })
      )
  } catch (err) {
    console.error(err)
  }
}

export default {
  createUser,
  getUsers
}
