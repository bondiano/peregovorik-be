const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { Schema } = mongoose

/**
 * @swagger
 * definitions:
 *  Room:
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      createdAt:
 *        type: string
 *
 */
const roomSchema = new Schema(
  {
    name: {
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

roomSchema.plugin(mongoosePaginate)

const Room = mongoose.model('Room', roomSchema)
module.exports = Room
