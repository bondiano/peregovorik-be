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
 *             $ref: '#/components/schemas/Event'
 *
 */
createController('get', '/', async (ctx, next, { services }) => {
  const events = await services.getAll()

  ctx.response.body = events
})

/**
 * @swagger
 * /events:
 *   get:
 *     tags:
 *      - Events
 *     description: Get event by id (only room id is available here)
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/components/schemas/Event'
 *
 */
createController('get', '/:id', async (ctx, next, { services }) => {
  const { id } = ctx.params
  const event = await services.getById(id)

  ctx.response.body = event
})
