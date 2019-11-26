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
 *                 items: string
 *               room:
 *                 type: string
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
    console.log('ctx.body', ctx.body)
    ctx.response.body = ctx.body
  },
)
