const { registerControllers } = require('@/helpers/registerControllers')
const { authHandler } = require('@/helpers/authHandler')

const createController = registerControllers(module)

/**
 * @swagger
 * /media/upload:
 *   post:
 *     tags:
 *      - Common
 *     description: Upload some file to S3 bucket
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: base64
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         schema:
 */
createController(
  'post',
  '/upload',
  authHandler,
  async (ctx, next, { services }) => {
    const fileData = await services.upload(
      ctx.request.body.fileName,
      ctx.request.files.file,
    )

    ctx.response.body = fileData
  },
)
