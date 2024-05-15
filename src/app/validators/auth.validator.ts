import { zValidator } from '@hono/zod-validator'

import { LoginDto, RegisterDto } from '../dtos/auth.dto'
import { type Variables } from '../typings'

export const registerDtoValidator = zValidator<
  typeof RegisterDto,
  'json',
  { Variables: Variables },
  string
>('json', RegisterDto)

export const loginDtoValidator = zValidator<
  typeof LoginDto,
  'json',
  { Variables: Variables },
  string
>('json', LoginDto)
