const createController = require('./media.controller')
const createServices = require('./media.services')

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
  name: 'media',
  baseRoute: '/media',
}
