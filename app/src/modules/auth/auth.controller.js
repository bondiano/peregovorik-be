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
 *     tags:
 *       - Auth
 *     description: Create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               $ref : '#/components/schemas/User'
 *             token:
 *               type: string
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
 *     tags:
 *       - Auth
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               $ref : '#/components/schemas/User'
 *             token:
 *               type: string
 */
createController(
  'post',
  '/login',
  validatorHandler(loginSchema),
  async (ctx, next, { jwtServices }) => {
    await passport.authenticate('local', { session: false }, (err, user) => {
      if (err) {
        throw err
      }

      const payload = {
        id: user._id,
      }

      const token = jwtServices.sign(payload)
      ctx.response.body = { user, token }
    })(ctx, next)
  },
)

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     description: Returns user data by token
 *     responses:
 *       200:
 *         schema:
 *           $ref : '#/components/schemas/User'
 */
createController('get', '/me', authHandler, async ctx => {
  const { user } = ctx

  ctx.response.body = user
})
