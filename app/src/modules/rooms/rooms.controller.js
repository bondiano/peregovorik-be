const { registerControllers } = require('@/helpers/registerControllers')

const createController = registerControllers(module)

/**
 * @swagger
 * /rooms:
 *   get:
 *     tags:
 *       - Rooms
 *     description: Get list of rooms (only event ids are available here)
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
  console.log('ctx.req', ctx.req)
  const rooms = await services.getAll()

  ctx.response.body = rooms
})
