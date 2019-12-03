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
 *     parameters:
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         schema:
 *           type: '#/components/schemas/User'
 *
 */
// TODO: implement update current user data
createController(
  'patch',
  '/',
  authHandler,
  validatorHandler(updateUserSchema),
  async (ctx, next, { services }) => {
    const user = await services.getById()

    ctx.response.body = user
  },
)
