const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { Schema } = mongoose

const { Types } = Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         images:
 *           type: [string]
 *         room:
 *           $ref: '#/components/schemas/Room'
 *         createdAt:
 *           type: string
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
