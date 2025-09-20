import { NextFunction, Request, Response } from 'express'
import { Role, Severity, Status } from '@prisma/client'
import bugService from '../services/bug.service'
import { HttpError } from '../utils/http-error'
import JsonResponse from '../utils/json-response'
import { ExpressRequest } from '../middlewares/auth'
import { createBugSchema, updateBugSchema } from '../schemas/bug.schema'

async function createBug(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const { title, description, severity, status } = createBugSchema.parse(req.body)

    const bug = await bugService.createBug(req.user!.id, {
      title,
      description,
      severity,
      status
    })

    res.status(201).json(
      new JsonResponse({
        status: 'success',
        message: 'Bug created successfully',
        data: bug
      })
    )
  } catch (err) {
    next(err)
  }
}

async function getAllBugs(req: Request, res: Response, next: NextFunction) {
  try {
    const { severity, status } = req.query as {
      severity?: Severity
      status?: Status
    }

    const bugs = await bugService.getAllBugs({ severity, status })

    res.status(200).json(
      new JsonResponse({
        status: 'success',
        message: 'Bugs fetched successfully',
        data: bugs
      })
    )
  } catch (err) {
    next(err)
  }
}

async function getMyBugs(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const bugs = await bugService.getBugsByReporter(req.user!.id)

    res.status(200).json(
      new JsonResponse({
        status: 'success',
        message: 'Your bugs fetched successfully',
        data: bugs
      })
    )
  } catch (err) {
    next(err)
  }
}

async function getBugById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const bug = await bugService.getBugById(id)

    if (!bug) {
      throw new HttpError(404, 'Bug not found')
    }

    res.status(200).json(
      new JsonResponse({
        status: 'success',
        message: 'Bug fetched successfully',
        data: bug
      })
    )
  } catch (err) {
    next(err)
  }
}

async function updateBug(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const { title, description, severity, status } = updateBugSchema.parse(req.body)

    const existingBug = await bugService.getBugById(id)

    if (!existingBug) {
      throw new HttpError(404, 'Bug not found')
    }

    // Check if user is the reporter or an admin
    if (req.user!.role !== Role.ADMIN && existingBug.reporterId !== req.user!.id) {
      throw new HttpError(403, 'Only the reporter or an admin can update a bug')
    }

    if (status && req.user!.role !== 'ADMIN') {
      throw new HttpError(403, 'Only admins can update bug status')
    }

    const updateData: any = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (severity) updateData.severity = severity
    if (status) updateData.status = status

    const updatedBug = await bugService.updateBug(id, updateData)

    res.status(200).json(
      new JsonResponse({
        status: 'success',
        message: 'Bug updated successfully',
        data: updatedBug
      })
    )
  } catch (err) {
    next(err)
  }
}

async function deleteBug(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    const existingBug = await bugService.getBugById(id)

    if (!existingBug) {
      throw new HttpError(404, 'Bug not found')
    }

    // Check if user is the reporter or an admin
    if (req.user!.role !== Role.ADMIN && existingBug.reporterId !== req.user!.id) {
      throw new HttpError(403, 'You can only delete your own bugs')
    }

    await bugService.deleteBug(id)

    res.status(200).json(
      new JsonResponse({
        status: 'success',
        message: 'Bug deleted successfully'
      })
    )
  } catch (err) {
    next(err)
  }
}

export default {
  createBug,
  getAllBugs,
  getMyBugs,
  getBugById,
  updateBug,
  deleteBug
}
