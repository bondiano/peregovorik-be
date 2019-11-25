const createController = require('./users.controller')
const createServices = require('./users.services')

exports.moduleFabric = (app, { events }) => {
  const services = createServices({ eventsServices: events.services })

  return {
    controller: createController({ services }),
    exports: {
      services,
    },
  }
}

exports.moduleMeta = {
  name: 'users',
  baseRoute: '/users',
  dependsOn: ['events'],
}
