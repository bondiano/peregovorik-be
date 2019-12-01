const Joi = require('joi')

exports.getFreeRoomsSchema = Joi.object().keys({
  city: Joi.string().required(),
  from: Joi.date().required(),
  to: Joi.date()
    .greater(Joi.ref('from'))
    .required(),
})

exports.getRoomsSchema = Joi.object().keys({
  city: Joi.string().required(),
  date: Joi.date(),
  offset: Joi.number(),
  limit: Joi.number(),
})
