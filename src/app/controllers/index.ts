import { Hono } from 'hono'

import { authController } from './auth.controller'
import { todoController } from './todo.controller'
import { userController } from './user.controller'

export const indexController = new Hono().basePath('/api')

indexController.route('/', authController)
indexController.route('/', userController)
indexController.route('/', todoController)
