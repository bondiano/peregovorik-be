const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { Schema } = mongoose

const { Types } = Schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       properties:
 *         roomNumber:
 *           type: number
 *         description:
 *           type: string
 *         city:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *         events:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Event'
 *         createdAt:
 *           type: string
 *
 */
const roomSchema = new Schema(
  {
    roomNumber: Number,
    description: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    city: String,
    equipment: {
      type: [String],
      default: [],
    },
    events: [Types.ObjectId],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
)

roomSchema.plugin(mongoosePaginate)

const Room = mongoose.model('Room', roomSchema)
module.exports = Room