const { pick } = require('lodash')

exports.formatCreateEvent = user =>
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
