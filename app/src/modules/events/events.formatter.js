const { pick } = require('lodash')

exports.formatEvent = user =>
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
