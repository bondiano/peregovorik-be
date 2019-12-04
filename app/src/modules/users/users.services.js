const { userRepository } = require('./users.repository')

const { formatUser } = require('./users.formatter')

module.exports = () => {
  const createUser = async ({ username, email, password }) => {
    const user = await userRepository.create({
      username,
      email,
      password,
    })

    return formatUser(user)
  }

  const updateUserById = async (id, data) => {
    const user = await userRepository.updateById(id, data)

    return formatUser(user)
  }

  const getById = async id => {
    const user = await userRepository.getUserWithEvent(id)

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

  const update = userRepository.update

  return {
    createUser,
    updateUserById,
    getById,
    findOne,
    update,
    verifyPassword,
  }
}
