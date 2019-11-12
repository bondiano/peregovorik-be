const { createRepository } = require('../../helpers/mongooseCRUD')

const userModel = require('./users.model')

const { formatUser } = require('./users.formatter')

const userRepository = createRepository(userModel)

module.exports = () => {
  const createUser = async ({ username, email, password }) => {
    const user = await userRepository.create({
      username,
      email,
      password,
    })

    return formatUser(user)
  }

  const getAll = conditions => userRepository.getAll(conditions)

  return {
    getAll,
    createUser,
  }
}
