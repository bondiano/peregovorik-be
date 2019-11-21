const { registerControllers } = require('@/helpers/registerControllers')

const createController = registerControllers(module)

/**
 * @swagger
 * /events:
 *   get:
 *     description: get all events
 *     responses:
 *       200:
 *         description: get list of events
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *
 */
createController('get', '/', async (ctx, next, { services }) => {
  const events = await services.getAll()

  ctx.response.body = events
})
