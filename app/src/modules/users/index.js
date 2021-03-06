const createController = require('./users.controller')
const createServices = require('./users.services')

exports.moduleFabric = app => {
  const services = createServices()

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
}
