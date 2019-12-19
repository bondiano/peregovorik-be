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
    const user = await userRepository.findOneWithEvent(conditions)

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

  const updateCurrentUser = async (userData, newData) => {
    const { password, oldPassword, ...data } = newData

    if (password) {
      const user = await userRepository.getById(userData._id)
      const isValidOldPassword = user.verifyPassword(oldPassword)

      if (!isValidOldPassword) {
        throw new Error('Old password is not valid')
      }

      data.password = password
    }

    return await updateUserById(user._id, data)
  }

  return {
    createUser,
    updateUserById,
    getById,
    findOne,
    update,
    verifyPassword,
    updateCurrentUser,
  }
}
