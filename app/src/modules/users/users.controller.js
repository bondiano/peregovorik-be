const { registerControllers } = require('../../helpers/registerControllers')

const createController = registerControllers(module)

createController('get', '/', async (ctx, next, { services }) => {
  const users = await services.getAll()

  ctx.response.body = users
})
