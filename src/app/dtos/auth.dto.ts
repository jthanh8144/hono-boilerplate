import { z } from 'zod'

export const RegisterDto = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  age: z.number(),
})

export const LoginDto = z.object({
  email: z.string(),
  password: z.string(),
})
