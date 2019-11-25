const { registerControllers } = require('@/helpers/registerControllers')

const createController = registerControllers(module)

/**
 * @swagger
 * /events:
 *   get:
 *     tags:
 *      - Events
 *     description: Get list of events (only room id is available here)
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *
 */
createController('get', '/', async (ctx, next, { services }) => {
  const events = await services.getAll()

  ctx.response.body = events
})
