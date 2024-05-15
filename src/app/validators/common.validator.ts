import { zValidator } from '@hono/zod-validator'

import { IdParams } from '../dtos/common.dto'
import { type Variables } from '../typings'

export const idParamsValidator = zValidator<
  typeof IdParams,
  'param',
  { Variables: Variables },
  string
>('param', IdParams)
