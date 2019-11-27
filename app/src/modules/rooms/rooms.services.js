const { roomRepository } = require('./room.repository')

module.exports = () => {
  const getAll = conditions => roomRepository.getAllWithEvents(conditions)

  const updateRoomById = async (id, data) => {
    const room = await roomRepository.updateById(id, data)

    return room
  }

  const getRoomById = async id => {
    const room = await roomRepository.getRoomWithEvent(id)

    return room
  }

  return {
    getAll,
    updateRoomById,
    getRoomById,
  }
}
