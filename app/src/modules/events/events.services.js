const dateFns = require('date-fns')

const { eventRepository } = require('./events.repository')
const { formatCreateEvent } = require('./events.formatter')
const { InvalidDate } = require('./exceptions')

// TODO: implement this method. It should be less then 6 hours and only on one day
const isValidDateDiff = (from, to) => true

// TODO: implement this method
const isTimeInRoomBusy = (room, from, to) => false

module.exports = ({ roomsServices, usersServices }) => {
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

    const event = await eventRepository.create({
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
      ...formatCreateEvent(event),
      createdBy: userData,
      room: roomData,
    }
  }

  const getAll = conditions => eventRepository.getAllEventsWithData(conditions)

  const getById = async id => {
    const event = await eventRepository.getEventWithDataById(id)

    return event
  }

  // TODO: implement this service
  const updateById = async ({ id, user, data }) => {}

  // TODO: implement this service
  const applyToEvent = async (eventId, userId) => {}

  // TODO: implement this service
  const denyFromEvent = async (eventId, userId) => {}

  return {
    getAll,
    getById,
    createEvent,
    updateById,
    applyToEvent,
    denyFromEvent,
  }
}
