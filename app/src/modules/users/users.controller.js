const { registerControllers } = require('@/helpers/registerControllers')

const createController = registerControllers(module)

/**
 * @swagger
 * /users:
 *   get:
 *     description: get all users
 *     responses:
 *       200:
 *         description: get list of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *
 */
createController('get', '/', async (ctx, next, { services }) => {
  const users = await services.getAll()

  ctx.response.body = users
})
