const { registerControllers } = require('@/helpers/registerControllers')

const createController = registerControllers(module)

/**
 * @swagger
 * /media/upload:
 *   post:
 *     tags:
 *      - Common
 *     description: Upload some file to S3 bucket
 *     responses:
 *       200:
 *         schema:
 */
createController('post', '/upload', async (ctx, next, { services }) => {
  const fileData = await services.upload(ctx.req.data)

  ctx.response.body = fileData.url
})
