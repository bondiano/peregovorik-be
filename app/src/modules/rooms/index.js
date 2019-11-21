const createController = require('./rooms.controller')
const createServices = require('./rooms.services')

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
  name: 'rooms',
  baseRoute: '/rooms',
}
