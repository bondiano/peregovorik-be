const createController = require('./meetings.controller')
const createServices = require('./meetings.services')

exports.moduleFabric = (app, { events, rooms, users }) => {
  const externalServices = {
    eventsServices: events.services,
    roomsServices: rooms.services,
    usersServices: users.services,
  }

  const services = createServices(externalServices)

  return {
    controller: createController({ services }),
  }
}

exports.moduleMeta = {
  name: 'meetings',
  baseRoute: '/meetings',
  dependsOn: ['events', 'rooms', 'users'],
}
