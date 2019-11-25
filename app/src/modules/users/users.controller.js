const { registerControllers } = require('@/helpers/registerControllers')

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
  const { id } = ctx.request.params
  const user = await services.getById(id)

  ctx.response.body = user
})
