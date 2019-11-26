const createController = require('./meetings.controller')

exports.moduleFabric = app => {
  return {
    controller: createController(),
  }
}

exports.moduleMeta = {
  name: 'meetings',
  baseRoute: '/meetings',
  dependsOn: ['events', 'rooms', 'users'],
}
