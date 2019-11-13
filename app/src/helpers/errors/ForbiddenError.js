const BaseError = require('./BaseError')

class ForbiddenError extends BaseError {
  get errorType() {
    return BaseError.errorTypes.FORBIDDEN
  }

  get httpErrorCode() {
    return BaseError.httpErrorCodes.forbidden
  }

  get errorMessage() {
    return 'forbidden'
  }
}

module.exports = ForbiddenError
