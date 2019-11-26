const { createRepository } = require('../../helpers/mongooseCRUD')

const eventModel = require('./events.model')

const eventRepository = createRepository(eventModel)

module.exports = () => {
  const getAll = conditions => eventRepository.getAll(conditions)

  const getById = async id => {
    const event = await eventRepository.getById(id)

    return event
  }

  return {
    getAll,
    getById,
  }
}
