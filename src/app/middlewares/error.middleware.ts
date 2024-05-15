import { type ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes } from 'http-status-codes'

import { logger } from '../utils/logger'

export const errorMiddleware: ErrorHandler = (err, c) => {
  const status =
    err instanceof HTTPException
      ? err.status
      : StatusCodes.INTERNAL_SERVER_ERROR
  logger.error(
    `[${c.req.method}] ${c.req.path} >> StatusCode:: ${status}, Message:: ${err.message}`,
    err,
  )
  c.status(status)
  return c.json({ message: err.message })
}
