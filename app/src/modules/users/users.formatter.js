const { pick } = require('lodash')

exports.formatUser = user =>
  pick(user, ['_id', 'username', 'email', 'createdAt'])
