import { Hono } from 'hono'
import { html } from 'hono/html'
import { type PropsWithChildren } from 'hono/jsx'

export const staticController = new Hono().basePath('/static')

staticController.get('/html/:username', async (c) => {
  const username = c.req.param('username')
  return await c.html(
    html`<!doctype html>
      <h1>Hello! ${username}!</h1>`,
  )
})

async function Component({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return await (
    <div>
      <h1>{title}</h1>
      {children}
      <>
        <p>first child</p>
        <p>second child</p>
        <p>third child</p>
      </>
    </div>
  )
}

staticController.get('/jsx', async (c) => {
  return await c.html(
    <Component title={'Title'}>
      <h2>Hello</h2>
    </Component>,
  )
})
