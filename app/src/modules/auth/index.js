const createController = require('./auth.controller')

exports.moduleFabric = (app, { jwt, users }) => {
  return {
    controller: createController({
      usersServices: users.services,
      jwtServices: jwt.services,
    }),
  }
}

exports.moduleMeta = {
  name: 'auth',
  baseRoute: '/auth',
  dependsOn: ['jwt', 'users'],
}
