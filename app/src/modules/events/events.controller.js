const { registerControllers } = require('@/helpers/registerControllers')

const { authHandler } = require('@/helpers/authHandler')
const { validatorHandler } = require('@/helpers/validatorHandler')

const { eventSchema } = require('./events.validators')

const createController = registerControllers(module)

/**
 * @swagger
 * /events:
 *   post:
 *     tags:
 *      - Events
 *     description: Create new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               from:
 *                 type: string
 *                 format: date-time
 *               to:
 *                 type: string
 *                 format: date-time
 *               room:
 *                 type: string
 *                 description: Room id
 *                 example: abcd56789012345678901234
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/components/schemas/Event'
 *
 */
createController(
  'post',
  '/',
  authHandler,
  validatorHandler(eventSchema),
  async (ctx, next, { services }) => {
    const { user } = ctx

    const event = await services.createEvent({ ...ctx.request.body, user })

    ctx.response.body = event
  },
)

/**
 * @swagger
 * /events:
 *   get:
 *     tags:
 *      - Events
 *     description: Get list of events
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Event'
 *
 */
// TODO: implement filters and pagination for events list
// TODO: add event room info to response
createController('get', '/', async (ctx, next, { services }) => {
  const events = await services.getAll()

  ctx.response.body = events
})

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     tags:
 *      - Events
 *     description: Get event by id
 *     parameters:
 *       -
 *         name: id
 *         in: path
 *         description: Event id
 *         required: true
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

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     tags:
 *      - Events
 *     description: Update event by id
 *     parameters:
 *       -
 *         name: id
 *         in: path
 *         description: Event id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               from:
 *                 type: string
 *                 format: date-time
 *               to:
 *                 type: string
 *                 format: date-time
 *               room:
 *                 type: string
 *                 description: Room id
 *                 example: abcd56789012345678901234
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/components/schemas/Event'
 *
 */
// TODO: implement update event for creator
createController(
  'patch',
  '/:id',
  authHandler,
  validatorHandler(eventSchema),
  async (ctx, next, { services }) => {
    const { user } = ctx
    const { id } = ctx.params

    const event = await services.updateById({
      id,
      user,
      data: ctx.request.body,
    })

    ctx.response.body = event
  },
)

/**
 * @swagger
 * /events/{id}/apply:
 *   post:
 *     tags:
 *      - Events
 *     description: Apply to event
 *     parameters:
 *       -
 *         name: id
 *         in: path
 *         description: Event id
 *         required: true
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/components/schemas/Event'
 *
 */
// TODO: implement apply user to event
createController(
  'post',
  '/:id/apply',
  authHandler,
  async (ctx, next, { services }) => {
    const { user } = ctx
    const { id } = ctx.params

    const event = await services.applyToEvent(id, user._id)

    ctx.response.body = event
  },
)

/**
 * @swagger
 * /events/{id}/deny:
 *   post:
 *     tags:
 *      - Events
 *     description: Deny from event
 *     parameters:
 *       -
 *         name: id
 *         in: path
 *         description: Event id
 *         required: true
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/components/schemas/Event'
 *
 */
// TODO: implement deny user from event
createController(
  'post',
  '/:id/deny',
  authHandler,
  async (ctx, next, { services }) => {
    const { user } = ctx
    const { id } = ctx.params

    const event = await services.denyFromEvent(id, user._id)

    ctx.response.body = event
  },
)
