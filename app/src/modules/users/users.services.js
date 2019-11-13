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

  const getById = async id => {
    const user = await userRepository.getById(id)

    return formatUser(user)
  }

  const findOne = async conditions => {
    const user = await userRepository.findOne(conditions)

    return formatUser(user)
  }

  const verifyPassword = async (username, password) => {
    const user = await userRepository.findOne({ username })

    if (!user) {
      return false
    }

    return user.verifyPassword(password)
  }

  return {
    getAll,
    createUser,
    getById,
    findOne,
    verifyPassword,
  }
}
