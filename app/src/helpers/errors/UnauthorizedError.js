const BaseError = require('./BaseError')

class UnauthorizedError extends BaseError {
  get errorType() {
    return BaseError.errorTypes.UNAUTHORIZED
  }

  get httpErrorCode() {
    return BaseError.httpErrorCodes.unauthorized
  }

  get errorMessage() {
    return 'Unauthorized'
  }
}

module.exports = UnauthorizedError
