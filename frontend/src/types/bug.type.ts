import type { Severity, Status } from '../schemas/bug.schema'
import type { User } from './user.type'

export interface Bug {
  id: string
  title: string
  description: string
  severity: Severity
  status: Status
  createdAt: Date
  updatedAt: Date
  reporterId: string
  reporter: User
}
