const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const argon2 = require('argon2')

const { Schema } = mongoose

const { Types } = Schema

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         about:
 *           type: string
 *         avatar:
 *           type: string
 *         events:
 *           $ref: '#/components/schemas/Event'
 *         createdAt:
 *           type: string
 *       required:
 *         - username
 *         - email
 */
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    firstName: String,
    lastName: String,
    about: String,
    avatar: String,
    events: {
      type: [Types.ObjectId],
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

userSchema.plugin(mongoosePaginate)

userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await argon2.hash(this.password, { type: argon2.argon2id })
      this.password = hash
      return next()
    } catch (err) {
      return next(err)
    }
  } else {
    return next()
  }
})

userSchema.methods.verifyPassword = function(password) {
  return argon2.verify(this.password, password)
}

const User = mongoose.model('User', userSchema)
module.exports = User
