const { createRepository } = require('@/helpers/mongooseCRUD')

const roomModel = require('./rooms.model')

const roomRepository = createRepository(roomModel)

roomRepository.getAllWithEvents = async function getAllWithEvents(conditions) {
  const rooms = await roomModel
    .find(conditions)
    .populate('events')
    .exec()

  return rooms
}

roomRepository.getRoomWithEvent = async function getAllWithEvents(id) {
  const room = await roomModel
    .findById(id)
    .populate('events')
    .exec()

  return room
}

exports.roomRepository = roomRepository
