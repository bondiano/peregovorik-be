const {
  parseISO,
  isSameDay,
  differenceInHours,
  areIntervalsOverlapping,
} = require('date-fns')

const { eventRepository } = require('./events.repository')
const { formatCreateEvent } = require('./events.formatter')
const { InvalidDate, NoRoom, NotEventCreator } = require('./exceptions')

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

// TODO: make all update and delete requests in transaction and move them to repository
module.exports = ({ roomsServices, usersServices }) => {
  const validateEventInfo = async ({ from, to, room }) => {
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
  }

  const createEvent = async ({
    title,
    description,
    images,
    from,
    to,
    room,
    user,
  }) => {
    await validateEventInfo({ from, to, room })

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

  const updateById = async ({ id, user, data }) => {
    const event = await eventRepository.getById(id)

    const isCurrentUserCreator = event.createdBy.equals(user)
    if (!isCurrentUserCreator) {
      throw new NotEventCreator()
    }

    await validateEventInfo({ ...event, ...data })

    const updatedEvent = await eventRepository.updateById(id, data)

    return updatedEvent
  }

  const applyToEvent = async (eventId, userId) => {
    const user = await usersServices.findOne(userId)

    const isUserHasEvent = user.events.some(({ id }) => id === eventId)

    if (isUserHasEvent) {
      // TODO: make special exception
      throw new Error('User already applied')
    }

    await usersServices.updateUserById(userId, {
      $push: { events: eventId },
    })

    const event = await eventRepository.updateById(eventId, {
      $push: { appliedUsers: userId },
    })

    return event
  }

  const denyFromEvent = async (eventId, userId) => {
    const user = await usersServices.findOne(userId)

    const isUserHasEvent = user.events.some(({ id }) => id === eventId)

    if (!isUserHasEvent) {
      // TODO: make special exception
      throw new Error('User already not applied to event with id: ' + eventId)
    }

    await usersServices.updateUserById(userId, {
      $pull: { events: eventId },
    })

    const event = await eventRepository.updateById(eventId, {
      $pull: { appliedUsers: userId },
    })

    if (!event.appliedUsers.length) {
      await eventRepository.deleteById(event._id)
    }

    return event
  }

  const deleteEvent = async (eventId, userId) => {
    const event = await eventRepository.getById(eventId)

    if (!event) {
      throw new Error('No such event')
    }

    const isCurrentUserCreator = event.createdBy.equals(userId)
    if (!isCurrentUserCreator) {
      throw new NotEventCreator()
    }

    await usersServices.update(
      { events: { $eq: event._id } },
      { $pull: { events: { _id: event._id } } },
    )

    await eventRepository.deleteById(event._id)

    return 'Successfully deleted'
  }

  return {
    getAll,
    getById,
    createEvent,
    updateById,
    applyToEvent,
    denyFromEvent,
    deleteEvent,
  }
}
