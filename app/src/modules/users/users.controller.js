const { registerControllers } = require('../../helpers/registerControllers')

const createController = registerControllers(module)

createController('post', '/create', async (ctx, next, deps) => {
  const { username, password, email } = ctx.request.body
  const user = await deps.services.createUser({ username, password, email })

  ctx.response.body = user
})
