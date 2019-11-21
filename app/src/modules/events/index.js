const createController = require('./events.controller')
const createServices = require('./events.services')

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
  name: 'events',
  baseRoute: '/events',
}
