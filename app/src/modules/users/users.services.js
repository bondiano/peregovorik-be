const { createRepository } = require('../../helpers/mongooseCRUD')

const userModel = require('./users.model')

const userRepository = createRepository(userModel)

module.exports = () => {
  const createUser = ({ username, email, password }) => {
    return userRepository.create({ username, email, password })
  }

  return {
    createUser,
  }
}
