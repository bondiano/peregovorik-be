const BaseError = require('./BaseError')

class UnknownError extends BaseError {
  get errorType() {
    return BaseError.errorTypes.DEFAULT_ERROR
  }

  get httpErrorCode() {
    return BaseError.httpErrorCodes.unknown
  }
}

module.exports = UnknownError
