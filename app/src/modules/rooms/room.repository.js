const {
  startOfDay,
  endOfDay,
  parseISO,
  areIntervalsOverlapping,
} = require('date-fns')
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

  const fromTime = compose(startOfDay, parseISO)(date)
  const toTime = compose(endOfDay, parseISO)(date)

  const rooms = await roomModel
    .find(findCondition, null, { limit: +limit, offset: +offset })
    .populate({
      path: 'events',
      match: date && { from: { $gt: fromTime }, to: date && { $lt: toTime } },
    })
    .exec()

  const total = await roomModel.countDocuments(findCondition)

  return { total, offset, limit, rooms }
}

roomRepository.getAllFreeRooms = async function getAllFreeRoom({
  city,
  from,
  to,
}) {
  const findCondition = {
    city,
  }

  const rooms = await roomModel
    .find(findCondition, null)
    .populate('events')
    .exec()

  const userTimeInterval = { start: parseISO(from), end: parseISO(to) }
  const freeRooms = rooms.filter(room =>
    room.events.some(
      event =>
        !areIntervalsOverlapping(
          {
            start: parseISO(new Date(event.from).toISOString()),
            end: parseISO(new Date(event.to).toISOString()),
          },
          userTimeInterval,
        ),
    ),
  )

  return freeRooms
}

roomRepository.getRoomWithEvent = async function getAllWithEvents(id) {
  const room = await roomModel
    .findById(id)
    .populate('events')
    .exec()

  return room
}

exports.roomRepository = roomRepository
