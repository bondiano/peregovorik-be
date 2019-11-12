const createServices = require('./jwt.services')

exports.moduleFabric = (app, { config }) => {
  const services = createServices({ config })

  return {
    exports: {
      services,
    },
  }
}

exports.moduleMeta = {
  name: 'jwt',
  dependsOn: ['config'],
}
