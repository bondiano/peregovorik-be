const { NotFoundError } = require('@/helpers/errors')

class UserNotFound extends NotFoundError {
  constructor() {
    super('User', 'User was not found')
  }
}

module.exports = UserNotFound
