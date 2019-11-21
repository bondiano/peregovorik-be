const { createRepository } = require('../../helpers/mongooseCRUD')

const eventModel = require('./events.model')

const eventRepository = createRepository(eventModel)

module.exports = () => {
  const getAll = conditions => eventRepository.getAll(conditions)

  return {
    getAll,
  }
}
