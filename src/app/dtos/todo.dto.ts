import { z } from 'zod'

export const TodoDto = z.object({
  title: z.string(),
  description: z.string(),
})
