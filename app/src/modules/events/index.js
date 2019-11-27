const createController = require('./events.controller')
const createServices = require('./events.services')

exports.moduleFabric = (app, { rooms, users }) => {
  const externalServices = {
    roomsServices: rooms.services,
    usersServices: users.services,
  }

  const services = createServices(externalServices)

  return {
    controller: createController({ services }),
    exports: {
      services,
    },
  }
}

exports.moduleMeta = {
  name: 'events',
  baseRoute: '/events',
  dependsOn: ['rooms', 'users'],
}
