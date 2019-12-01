const { roomRepository } = require('./room.repository')

module.exports = () => {
  const getAll = roomRepository.getAllWithEvents

  const getAllFreeRooms = roomRepository.getAllFreeRooms

  const updateRoomById = roomRepository.updateById

  const getRoomById = roomRepository.getRoomWithEvent

  return {
    getAll,
    updateRoomById,
    getRoomById,
    getAllFreeRooms,
  }
}
