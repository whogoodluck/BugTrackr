import { prisma } from '../lib/prisma'
import { Severity, Status } from '@prisma/client'
import { CreateBugSchema, UpdateBugSchema } from '../schemas/bug.schema'

async function createBug(reporterId: string, data: CreateBugSchema) {
  const bug = await prisma.bug.create({
    data: {
      reporterId: reporterId,
      ...data
    }
  })

  return bug
}

interface GetAllBugsParams {
  severity?: Severity
  status?: Status
}

async function getAllBugs({ severity, status }: GetAllBugsParams) {
  const whereClause: any = {}

  if (severity) whereClause.severity = severity
  if (status) whereClause.status = status

  const bugs = await prisma.bug.findMany({
    where: whereClause,
    include: {
      reporter: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return bugs
}

async function getBugsByReporter(reporterId: string) {
  const bugs = await prisma.bug.findMany({
    where: {
      reporterId
    },
    include: {
      reporter: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return bugs
}

async function getBugById(id: string) {
  const bug = await prisma.bug.findUnique({
    where: {
      id
    },
    include: {
      reporter: true
    }
  })

  return bug
}

async function updateBug(id: string, data: UpdateBugSchema) {
  const bug = await prisma.bug.update({
    where: {
      id
    },
    data
  })

  return bug
}

async function deleteBug(id: string) {
  const bug = await prisma.bug.delete({
    where: {
      id
    }
  })

  return bug
}

export default {
  createBug,
  getAllBugs,
  getBugsByReporter,
  getBugById,
  updateBug,
  deleteBug
}
