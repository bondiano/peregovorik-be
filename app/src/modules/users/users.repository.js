const { createRepository } = require('../../helpers/mongooseCRUD')

const userModel = require('./users.model')

const userRepository = createRepository(userModel)

// TODO: need think about paginate on user events or separate get current user event to another endpoint
userRepository.getUserWithEvent = async function getAllWithEvents(id) {
  const user = await userModel
    .findById(id)
    .populate({
      path: 'events',
      populate: {
        path: 'room',
        select: 'roomNumber city equipment images',
      },
    })
    .exec()

  return user
}

exports.userRepository = userRepository
