const errorTypes = require('./errorTypes')
const httpErrorCodes = require('./httpErrorCodes')

class BaseError extends Error {
  static get errorTypes() {
    return errorTypes
  }

  static get httpErrorCodes() {
    return httpErrorCodes
  }

  get errorType() {
    return errorTypes.DEFAULT_ERROR
  }
}

module.exports = BaseError
