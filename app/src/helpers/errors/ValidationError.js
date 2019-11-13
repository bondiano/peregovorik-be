const BaseError = require('./BaseError')

class ValidationError extends BaseError {
  constructor(errors) {
    super()
    this.errors = errors
  }

  get errorType() {
    return BaseError.errorTypes.VALIDATION_ERROR
  }

  get httpErrorCode() {
    return BaseError.httpErrorCodes.badRequest
  }
}

module.exports = ValidationError
