const passport = require('koa-passport')

const { registerControllers } = require('@/helpers/registerControllers')
const { authHandler } = require('@/helpers/authHandler')
const { validatorHandler } = require('@/helpers/validatorHandler')

const { loginSchema, createUserSchema } = require('./auth.validators')

const createController = registerControllers(module)

/**
 * @swagger
 * /auth/create:
 *   post:
 *     description: create new user
 */
createController(
  'post',
  '/create',
  validatorHandler(createUserSchema),
  async (ctx, next, { usersServices, jwtServices }) => {
    const { username, password, email } = ctx.request.body
    const user = await usersServices.createUser({ username, password, email })

    const token = jwtServices.sign({ id: user._id })

    ctx.response.body = { user, token }
  },
)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: login user
 */
createController(
  'post',
  '/login',
  validatorHandler(loginSchema),
  async (ctx, next, { jwtServices }) => {
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
  },
)

/**
 * @swagger
 * /auth/me:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: returns user data by token
 */
createController('get', '/me', authHandler, async ctx => {
  const { user } = ctx

  ctx.response.body = user
})
