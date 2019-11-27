const Joi = require('joi')

exports.createEventSchema = Joi.object().keys({
  title: Joi.string(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string()),
  from: Joi.date()
    .greater('now')
    .required(),
  to: Joi.date()
    .greater(Joi.ref('from'))
    .required(),
  room: Joi.objectId().required(),
})
