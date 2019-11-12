const BaseError = require('./BaseError')

class DuplicateEntityError extends BaseError {
  constructor(_, entity) {
    super()
    this.entity = entity
  }

  get getEntity() {
    return this.entity
  }

  get errorMessage() {
    return `${this.entity} already exist`
  }

  get errorType() {
    return BaseError.errorTypes.DUPLICATED_ENTITY
  }

  get httpErrorCode() {
    return BaseError.httpErrorCodes.unprocessableEntity
  }
}

module.exports = DuplicateEntityError
