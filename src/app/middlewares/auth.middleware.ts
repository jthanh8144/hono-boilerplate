import { createFactory } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes } from 'http-status-codes'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

import { verifyToken } from '../utils/jwt'

export const authMiddleware = createFactory().createMiddleware(
  async (c, next) => {
    try {
      const header = c.req.header('Authorization')
      const token = header ? header.split(' ')[1] : ''
      c.set('user', verifyToken(token))
      await next()
    } catch (err) {
      if (
        err instanceof TokenExpiredError ||
        err instanceof JsonWebTokenError
      ) {
        throw new HTTPException(StatusCodes.UNAUTHORIZED, {
          message: err.message,
        })
      } else {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {
          message: err instanceof Error ? err.message : 'Some error happened',
        })
      }
    }
  },
)
