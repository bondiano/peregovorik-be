const createController = require('./meetings.controller')

exports.moduleFabric = (app, { events, rooms, users }) => {
  const externalServices = {
    eventsServices: events.services,
  }

  return {
    controller: createController({ services: externalServices }),
  }
}

exports.moduleMeta = {
  name: 'meetings',
  baseRoute: '/meetings',
  dependsOn: ['events', 'rooms', 'users'],
}
