const { registerControllers } = require('@/helpers/registerControllers')

const createController = registerControllers(module)

/**
 * @swagger
 * /rooms:
 *   get:
 *     tags:
 *       - Rooms
 *     description: Get list of rooms
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city name
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by date of events (only events for the date will be sent)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Room'
 *
 */
createController('get', '/', async (ctx, next, { services }) => {
  const { limit, offset, city, date } = ctx.query
  const { rooms, ...additional } = await services.getAll({
    limit,
    offset,
    city,
    date,
  })

  ctx.additional = additional
  ctx.response.body = rooms
})

/**
 * @swagger
 * /rooms/free:
 *   get:
 *     tags:
 *       - Rooms
 *     description: Get list of free rooms for time
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Room'
 *
 */
// TODO: implement get free rooms endpoint by time range and city
createController('get', '/free', async (ctx, next, { services }) => {
  const rooms = await services.getAll()

  ctx.response.body = rooms
})

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     tags:
 *       - Rooms
 *     description: Room by id
 *     parameters:
 *       -
 *         name: id
 *         in: path
 *         description: Room id
 *         required: true
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/components/schemas/Room'
 *
 */
createController('get', '/:id', async (ctx, next, { services }) => {
  const { id } = ctx.params

  const rooms = await services.getRoomById(id)

  ctx.response.body = rooms
})
