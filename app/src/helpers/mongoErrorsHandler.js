const { DuplicateEntityError, UnknownError } = require('./errors')

const mongoErrorsCodesMap = {
  11000: DuplicateEntityError,
  default: UnknownError,
}

const mongoErrorsHandler = (error, ...rest) => {
  const handledError =
    mongoErrorsCodesMap[error.code] || mongoErrorsCodesMap.default
  return new handledError(error, ...rest)
}

module.exports = mongoErrorsHandler
