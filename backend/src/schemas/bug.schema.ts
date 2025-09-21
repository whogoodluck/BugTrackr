import { z } from 'zod'
import { Severity, Status } from '@prisma/client'

export const createBugSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  description: z.string().min(1, 'Description is required'),
  severity: z.nativeEnum(Severity)
})

export const updateBugSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be less than 255 characters')
    .optional(),
  description: z.string().min(1, 'Description cannot be empty').optional(),
  severity: z.nativeEnum(Severity).optional(),
  status: z.nativeEnum(Status).optional()
})

export const bugStatusParamsSchema = z.object({
  status: z.nativeEnum(Status)
})

export const bugSeverityParamsSchema = z.object({
  severity: z.nativeEnum(Severity)
})

export type CreateBugSchema = z.infer<typeof createBugSchema>
export type UpdateBugSchema = z.infer<typeof updateBugSchema>
export type BugStatusParamsSchema = z.infer<typeof bugStatusParamsSchema>
export type BugSeverityParamsSchema = z.infer<typeof bugSeverityParamsSchema>
