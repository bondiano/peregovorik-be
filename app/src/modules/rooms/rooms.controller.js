const { registerControllers } = require('@/helpers/registerControllers')

const createController = registerControllers(module)

/**
 * @swagger
 * /rooms:
 *   get:
 *     description: get all rooms
 *     responses:
 *       200:
 *         description: get list of rooms
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *
 */
createController('get', '/', async (ctx, next, { services }) => {
  const rooms = await services.getAll()

  ctx.response.body = rooms
})
