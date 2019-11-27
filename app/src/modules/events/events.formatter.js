const { pick } = require('lodash')

exports.formatUser = user =>
  pick(user, [
    '_id',
    'title',
    'description',
    'images',
    'from',
    'to',
    'createdAt',
    'updatedAt',
  ])
