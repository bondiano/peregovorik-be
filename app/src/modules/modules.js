const modules = [
  require('./core/config'),
  require('./core/jwt'),
  require('./core/passport'),
  require('./core/swagger'),
  require('./users'),
  require('./events'),
  require('./rooms'),
  require('./auth'),
]

module.exports = modules
