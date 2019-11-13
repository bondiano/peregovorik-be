const BaseError = require('./BaseError')

class NotFoundError extends BaseError {
  constructor(entity, msg) {
    super()
    this.entity = entity
    this.msg = msg
  }

  get errorType() {
    return BaseError.errorTypes.NOT_FOUND
  }

  get httpErrorCode() {
    return BaseError.httpErrorCodes.notFound
  }

  get errorMessage() {
    return this.msg || `${this.entity} not found`
  }
}

module.exports = NotFoundError
