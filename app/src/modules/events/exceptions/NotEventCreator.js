const { BaseError } = require('@/helpers/errors')

class NotEventCreator extends BaseError {
  constructor(message) {
    super()
  }

  get errorType() {
    return BaseError.errorTypes.NOT_FOUND
  }

  get httpErrorCode() {
    return BaseError.httpErrorCodes.notFound
  }

  get errorMessage() {
    return 'You should be a creator of event'
  }
}

module.exports = NotEventCreator
