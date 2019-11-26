const Joi = require('joi')

exports.createEventSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string()),
  room: Joi.string().required(),
})
