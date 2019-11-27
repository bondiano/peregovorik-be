const dateFns = require('date-fns')

const { InvalidDate } = require('./exceptions')

const isValidDateDiff = (from, to) => true

const isTimeInRoomBusy = (room, from, to) => false

module.exports = ({ eventsServices, roomsServices, usersServices }) => {
  const createEvent = async ({
    title,
    description,
    images,
    from,
    to,
    room,
    user,
  }) => {
    if (!isValidDateDiff(from, to)) {
      throw new InvalidDate(
        'Difference between from and to must be less then 12 hours',
      )
    }

    if (isTimeInRoomBusy(room, from, to)) {
      throw new InvalidDate('This time in the room is busy')
    }

    const event = await eventsServices.createEvent({
      title,
      description,
      images,
      from,
      to,
      room,
      createdBy: user._id,
      appliedUsers: [user._id],
    })

    const userData = await usersServices.updateUserById(user._id, {
      $push: { events: event._id },
    })

    const roomData = await roomsServices.updateRoomById(room, {
      $push: { events: event._id },
    })

    return {
      ...event,
      createdBy: userData,
      room: roomData,
    }
  }

  const getRoomList = async () => {}

  const getRoomData = async () => {}

  const getEvents = async () => {}

  return { createEvent, getRoomList, getRoomData, getEvents }
}
