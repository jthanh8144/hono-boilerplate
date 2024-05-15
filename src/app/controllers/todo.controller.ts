import { Hono } from 'hono'

import { authMiddleware } from '../middlewares/auth.middleware'
import { todoRepository } from '../repositories'
import { idParamsValidator } from '../validators/common.validator'
import { todoDtoValidator } from '../validators/todo.validator'
import { type Variables } from './../typings'

export const todoController = new Hono<{
  Variables: Variables
}>()
  .basePath('/todos')
  .use(authMiddleware)

todoController.post('/', todoDtoValidator, async (c) => {
  const user = c.get('user')
  const { title, description } = c.req.valid('json')
  const todo = await todoRepository.save(
    todoRepository.create({ title, description, userId: user.id }),
  )
  return c.json(todo)
})

todoController.put('/:id', idParamsValidator, todoDtoValidator, async (c) => {
  const user = c.get('user')
  const { id } = c.req.valid('param')
  const { title, description } = c.req.valid('json')
  const todo = await todoRepository.save(
    todoRepository.create({ id, title, description, userId: user.id }),
  )
  return c.json(todo)
})

todoController.delete('/:id', idParamsValidator, async (c) => {
  const { id } = c.req.valid('param')
  await todoRepository.delete(id)
  return c.json({ message: 'deleted' })
})
