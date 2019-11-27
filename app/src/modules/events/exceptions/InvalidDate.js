const { BaseError } = require('@/helpers/errors')

class InvalidDate extends BaseError {
  constructor(message) {
    super()
    this.message = message
  }

  get errorType() {
    return BaseError.errorTypes.VALIDATION_ERROR
  }

  get httpErrorCode() {
    return BaseError.httpErrorCodes.badRequest
  }

  get errorMessage() {
    return this.message
  }
}

module.exports = InvalidDate
