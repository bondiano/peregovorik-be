const createController = require('./users.controller.js')
const createServices = require('./users.services')

exports.moduleFabric = (app, { events }) => {
  const services = createServices(events)

  return {
    controller: createController(services),
    exports: {},
  }
}

exports.moduleMeta = {
  name: 'users',
  baseRoute: '/users',
  dependsOn: ['events'],
}
