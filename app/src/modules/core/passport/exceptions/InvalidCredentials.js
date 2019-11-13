const { BaseError } = require('@/helpers/errors')

class UserNotFound extends BaseError {
  constructor() {
    super()
  }

  get errorType() {
    return BaseError.errorTypes.VALIDATION_ERROR
  }

  get httpErrorCode() {
    return BaseError.httpErrorCodes.badRequest
  }

  get errorMessage() {
    return 'Password or username is not valid'
  }
}

module.exports = UserNotFound
