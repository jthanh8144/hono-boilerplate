/* eslint-disable no-console */
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'
import { logger } from 'hono/logger'

import { indexController } from './app/controllers'
import { haveDocsController } from './app/controllers/have-docs'
import { staticController } from './app/controllers/static.controller'
import { errorMiddleware } from './app/middlewares/error.middleware'
import dataSource from './shared/configs/data-source.config'
import { environment } from './shared/constants'

try {
  const { isInitialized } = await dataSource.initialize()
  console.log('Database initialize status:', isInitialized)
} catch (e) {
  console.log(e)
}

const app = new Hono()

app
  .use(cors())
  .use(csrf())
  .use(logger())
  .use('/public/*', serveStatic({ root: './' }))
  .use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))
  .get('/', (c) => c.redirect('/docs'))
  .route('/', indexController)
  .route('/', haveDocsController)
  .route('/', staticController)
  .onError(errorMiddleware)

export default {
  port: environment.port,
  fetch: app.fetch,
}
