const { registerControllers } = require('@/helpers/registerControllers')

const createController = registerControllers(module)

/**
 * @swagger
 * /media/upload:
 *   post:
 *     description: upload some file to S3 bucket
 */
createController('post', '/upload', async (ctx, next, { services }) => {
  const fileData = await services.upload(ctx.req.data)

  ctx.response.body = fileData.url
})
