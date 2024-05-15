import { swaggerUI } from '@hono/swagger-ui'
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'

// src/dto/test.dto.ts
const IdParams = z.object({
  id: z
    .string()
    .transform((v) => parseInt(v))
    .refine((v) => !isNaN(v), { message: 'id is not a number' }),
})

const TestBodyDto = z.object({
  s: z.string(),
  n: z.number(),
})

const TestResponseDto = z.object({
  id: z.number(),
  s: z.string(),
  n: z.number(),
})

// src/routers/test.router.ts
const testRouter = createRoute({
  method: 'post',
  path: '/test/:id',
  tags: ['Test'],
  request: {
    params: IdParams,
    body: {
      content: {
        'application/json': {
          schema: TestBodyDto,
        },
      },
    },
  },
  responses: {
    200: {
      description: '',
      content: {
        'application/json': {
          schema: TestResponseDto,
        },
      },
    },
  },
})

// src/controllers/test.controller.ts
export const haveDocsController = new OpenAPIHono()

// #region add router handlers here
haveDocsController.openapi(testRouter, (c) => {
  const { id } = c.req.valid('param')
  const { s, n } = c.req.valid('json')
  return c.json({
    id,
    s,
    n,
  })
})
// #endregion add routers here

haveDocsController.get('/docs', swaggerUI({ url: '/json-docs' }))

haveDocsController.doc('/json-docs', {
  info: {
    title: 'Hono Boilerplate',
    version: '1.0.0',
  },
  openapi: '3.1.0',
})
