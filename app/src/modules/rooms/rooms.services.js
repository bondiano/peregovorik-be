const { createRepository } = require('../../helpers/mongooseCRUD')

const roomModel = require('./rooms.model')

const roomRepository = createRepository(roomModel)

module.exports = () => {
  const getAll = conditions => roomRepository.getAll(conditions)

  return {
    getAll,
  }
}
