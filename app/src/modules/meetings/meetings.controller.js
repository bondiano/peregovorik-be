const { registerControllers } = require('@/helpers/registerControllers')

const { authHandler } = require('@/helpers/authHandler')
const { validatorHandler } = require('@/helpers/validatorHandler')

const { createEventSchema } = require('./meetings.validators')

const createController = registerControllers(module)

/**
 * @swagger
 * /meetings/event:
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
  '/event',
  authHandler,
  validatorHandler(createEventSchema),
  async (ctx, next, { services }) => {
    const { user, body } = ctx

    const event = await services.createEvent({ ...body, user })

    ctx.response.body = event
  },
)
