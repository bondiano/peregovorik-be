const successResponse = data => ({
  success: true,
  data,
})

const errorResponse = error => ({
  success: false,
  error: {
    errorCode: error.errorCode,
    errorMessage: error.errorMessage,
    errors: error.errors,
  },
})

const errorHandler = async (ctx, next) => {
  try {
    await next()
    if (ctx.response.body) {
      ctx.response.status = 200
      ctx.response.body = successResponse(ctx.response.body)
    }
  } catch (e) {
    console.error('Handled error', e)

    ctx.response.status =
      typeof e.httpErrorCode === 'number' ? e.httpErrorCode : 500
    ctx.response.body = errorResponse(e)
  }
}

exports.errorHandler = errorHandler
