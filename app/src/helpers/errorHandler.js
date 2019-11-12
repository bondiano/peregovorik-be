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
    console.log('Handled error: ', e)
    ctx.response.status = e.httpErrorCode
    ctx.response.body = errorResponse(e)
  }
}

exports.errorHandler = errorHandler
