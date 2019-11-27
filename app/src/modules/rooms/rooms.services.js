const { createRepository } = require('../../helpers/mongooseCRUD')

const roomModel = require('./rooms.model')

const roomRepository = createRepository(roomModel)

module.exports = () => {
  const getAll = conditions => roomRepository.getAll(conditions)

  const updateRoomById = async (id, data) => {
    const room = await roomRepository.updateById(id, data)

    return room
  }

  return {
    getAll,
    updateRoomById,
  }
}
