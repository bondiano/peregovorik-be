const { createRepository } = require('@/helpers/mongooseCRUD')

const eventModel = require('./events.model')

const eventRepository = createRepository(eventModel)

eventRepository.getAllWithEvents = async function getAllWithEvents(conditions) {
  const events = await eventModel
    .find(conditions)
    .populate('events')
    .exec()

  return events
}

eventRepository.getEventWithDataById = async function getAllWithData(id) {
  const event = await eventModel
    .findById(id)
    .populate('room')
    .populate('appliedUsers')
    .exec()

  return event
}

exports.eventRepository = eventRepository
