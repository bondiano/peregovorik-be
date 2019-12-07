const createController = require('./media.controller')
const createServices = require('./media.services')

exports.moduleFabric = (app, { config }) => {
  const services = createServices({ config })

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
  dependsOn: ['config'],
}
