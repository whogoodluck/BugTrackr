import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  name: z.string().min(1, 'Name is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof registerSchema>
