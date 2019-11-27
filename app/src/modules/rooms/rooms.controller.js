const { registerControllers } = require('@/helpers/registerControllers')

const createController = registerControllers(module)

/**
 * @swagger
 * /rooms:
 *   get:
 *     tags:
 *       - Rooms
 *     description: Get list of rooms
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Room'
 *
 */
createController('get', '/', async (ctx, next, { services }) => {
  const rooms = await services.getAll()

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
 *     description: Room by id (only event ids are available here)
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
