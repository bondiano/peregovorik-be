const {
  parseISO,
  isSameDay,
  differenceInHours,
  areIntervalsOverlapping,
} = require('date-fns')

const { eventRepository } = require('./events.repository')
const { formatCreateEvent } = require('./events.formatter')
const { InvalidDate, NoRoom } = require('./exceptions')

const isValidDateDiff = (from, to) => {
  const fromISO = parseISO(from)
  const toISO = parseISO(to)

  return isSameDay(fromISO, toISO) && differenceInHours(toISO, fromISO) <= 6
}

const isTimeInRoomBusy = (events, from, to) => {
  const userTimeInterval = { start: parseISO(from), end: parseISO(to) }

  return events.some(event =>
    areIntervalsOverlapping(
      {
        start: parseISO(new Date(event.from).toISOString()),
        end: parseISO(new Date(event.to).toISOString()),
      },
      userTimeInterval,
    ),
  )
}

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
        'It should be the same day and difference between from and to must be less then 6 hours',
      )
    }

    const roomInfo = await roomsServices.getRoomById(room)

    if (!roomInfo) {
      throw new NoRoom(`Room with id ${room} is not found`)
    }

    if (isTimeInRoomBusy(roomInfo.events, from, to)) {
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
