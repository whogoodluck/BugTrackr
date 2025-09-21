import type { Role } from '../schemas/user.schema'

export interface User {
  id: string
  name: string
  email: string
  role: Role
}
