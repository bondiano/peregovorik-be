const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { Schema } = mongoose

/**
 * @swagger
 * definitions:
 *  Event:
 *    properties:
 *      title:
 *        type: string
 *      description:
 *        type: string
 *      createdAt:
 *        type: string
 *
 */
const eventSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
)

eventSchema.plugin(mongoosePaginate)

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
