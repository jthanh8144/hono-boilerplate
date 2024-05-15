import { Hono } from 'hono'

import { authMiddleware } from '../middlewares/auth.middleware'
import { profileRepository, todoRepository } from '../repositories'
import { type Variables } from './../typings/index'

export const userController = new Hono<{ Variables: Variables }>()
  .basePath('/users')
  .use(authMiddleware)

userController.get('/profile', async (c) => {
  const user = c.get('user')
  const profile = await profileRepository.findOne({
    where: { userId: user.id },
  })
  return c.json(profile)
})

userController.get('/todos', async (c) => {
  const user = c.get('user')
  const todos = await todoRepository.find({
    where: { userId: user.id },
  })
  return c.json(todos)
})
