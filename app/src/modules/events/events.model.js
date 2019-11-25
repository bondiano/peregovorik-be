const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { Schema } = mongoose

const { Types } = Schema
/**
 * @swagger
 * definitions:
 *  Event:
 *    properties:
 *      title:
 *        type: string
 *      description:
 *        type: string
 *      images:
 *        type: [string]
 *      room:
 *        type: Room
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
    images: {
      type: [String],
      default: [],
    },
    room: Types.ObjectId,
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
