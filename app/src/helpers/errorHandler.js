const successResponse = (data, additional) => ({
  success: true,
  data,
  additional,
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
    const needWrap = ctx.response.body && typeof ctx.response.body === 'object'

    if (needWrap) {
      ctx.response.status = 200
      const { additional } = ctx
      delete ctx.additional
      ctx.response.body = successResponse(ctx.response.body, additional)
    }
  } catch (e) {
    console.error('Handled error', e)

    ctx.response.status =
      typeof e.httpErrorCode === 'number' ? e.httpErrorCode : 500
    ctx.response.body = errorResponse(e)
  }
}

exports.errorHandler = errorHandler
