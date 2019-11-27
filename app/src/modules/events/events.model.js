const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const timeZone = require('mongoose-timezone')

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
 *         to:
 *           type: string
 *           format: date-time
 *         from:
 *           type: string
 *           format: date-time
 *         room:
 *           $ref: '#/components/schemas/Room'
 *         createdBy:
 *           $ref: '#/components/schemas/User'
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
    from: Date,
    to: Date,
    room: {
      type: Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    appliedUsers: {
      type: [
        {
          type: Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
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
eventSchema.plugin(timeZone, { paths: ['from', 'to'] })

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
