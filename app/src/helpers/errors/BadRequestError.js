const BaseError = require('./BaseError')

class BadRequestError extends BaseError {
  get errorType() {
    return BaseError.errorTypes.BAD_REQUEST
  }

  get httpErrorCode() {
    return BaseError.httpErrorCodes.badRequest
  }
}

module.exports = BadRequestError
