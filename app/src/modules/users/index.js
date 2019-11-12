const createController = require('./users.controller.js')
const createServices = require('./users.services')

exports.moduleFabric = app => {
  const services = createServices()

  return {
    controller: createController(services),
    exports: {},
  }
}

exports.moduleMeta = {
  name: 'users',
  baseRoute: '/users',
}
