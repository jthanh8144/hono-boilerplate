import { z } from 'zod'

export const IdParams = z.object({
  id: z
    .string()
    .transform((v) => parseInt(v))
    .refine((v) => !isNaN(v), { message: 'not a number' }),
})
