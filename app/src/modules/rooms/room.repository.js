const { startOfDay, endOfDay, parseISO } = require('date-fns')
const { compose } = require('lodash/fp')

const { createRepository } = require('@/helpers/mongooseCRUD')

const roomModel = require('./rooms.model')

const roomRepository = createRepository(roomModel)

roomRepository.getAllWithEvents = async function getAllWithEvents({
  limit = 10,
  offset = 0,
  city,
  date,
}) {
  const findCondition = {
    city,
  }

  const from = compose(startOfDay, parseISO)(date)
  const to = compose(endOfDay, parseISO)(date)

  const rooms = await roomModel
    .find(findCondition, null, { limit: +limit, offset: +offset })
    .populate({
      path: 'events',
      match: date && { from: { $gt: from }, to: date && { $lt: to } },
    })
    .exec()

  const total = await roomModel.countDocuments(findCondition)

  return { total, offset, limit, rooms }
}

roomRepository.getRoomWithEvent = async function getAllWithEvents(id) {
  const room = await roomModel
    .findById(id)
    .populate('events')
    .exec()

  return room
}

exports.roomRepository = roomRepository
