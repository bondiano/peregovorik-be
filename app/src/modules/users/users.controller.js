const { registerControllers } = require('@/helpers/registerControllers')

const { authHandler } = require('@/helpers/authHandler')
const { validatorHandler } = require('@/helpers/validatorHandler')

const { updateUserSchema } = require('./users.validator')

const createController = registerControllers(module)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *      - Users
 *     description: Get user by id
 *     parameters:
 *       -
 *         name: id
 *         in: path
 *         description: User id
 *         required: true
 *     responses:
 *       200:
 *         schema:
 *           type: '#/components/schemas/User'
 *
 */
createController('get', '/:id', async (ctx, next, { services }) => {
  const { id } = ctx.params
  const user = await services.getById(id)

  ctx.response.body = user
})

/**
 * @swagger
 * /users:
 *   patch:
 *     tags:
 *      - Users
 *     description: Update current user profile
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
 *               oldPassword:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *               about:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         schema:
 *           type: '#/components/schemas/User'
 *
 */
createController(
  'patch',
  '/',
  authHandler,
  validatorHandler(updateUserSchema),
  async (ctx, next, { services }) => {
    const user = await services.updateCurrentUser(ctx.user, ctx.body)

    ctx.response.body = user
  },
)
