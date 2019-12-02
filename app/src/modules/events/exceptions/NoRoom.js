const { BaseError } = require('@/helpers/errors')

class NoRoom extends BaseError {
  constructor(message) {
    super()
    this.message = message
  }

  get errorType() {
    return BaseError.errorTypes.NOT_FOUND
  }

  get httpErrorCode() {
    return BaseError.httpErrorCodes.notFound
  }

  get errorMessage() {
    return this.message
  }
}

module.exports = NoRoom
