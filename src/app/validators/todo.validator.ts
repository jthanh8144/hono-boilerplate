import { zValidator } from '@hono/zod-validator'

import { TodoDto } from '../dtos/todo.dto'
import { type Variables } from '../typings'

export const todoDtoValidator = zValidator<
  typeof TodoDto,
  'json',
  { Variables: Variables },
  string
>('json', TodoDto)
