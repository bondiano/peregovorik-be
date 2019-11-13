const passport = require('koa-passport')

const { registerControllers } = require('@/helpers/registerControllers')
const { authHandler } = require('@/helpers/authHandler')

const createController = registerControllers(module)

createController(
  'post',
  '/create',
  async (ctx, next, { usersServices, jwtServices }) => {
    const { username, password, email } = ctx.request.body
    const user = await usersServices.createUser({ username, password, email })

    const token = jwtServices.sign({ id: user._id })

    ctx.response.body = { user, token }
  },
)

createController('post', '/login', async (ctx, next, { jwtServices }) => {
  await passport.authenticate(
    'local',
    { session: false },
    (err, user, info) => {
      if (err) {
        throw err
      }

      const payload = {
        id: user._id,
      }

      const token = jwtServices.sign(payload)
      ctx.response.body = { user, token }
    },
  )(ctx, next)
})

createController('get', '/me', authHandler, async ctx => {
  const { user } = ctx

  ctx.response.body = user
})
