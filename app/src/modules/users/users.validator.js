const Joi = require('joi')

const usernameRules = Joi.string()
  .min(2)
  .max(20)
const passwordRules = Joi.string()
  .min(8)
  .max(256)
const emailRules = Joi.string().email({ minDomainAtoms: 2 })

exports.updateUserSchema = Joi.object().keys({
  username: usernameRules,
  password: passwordRules,
  email: emailRules,
  avatar: Joi.string().uri(),
  oldPassword: Joi.when('password', {
    is: Joi.exist(),
    then: passwordRules.required(),
  }),
  about: Joi.string().max(256),
  firstName: Joi.string().max(256),
  lastName: Joi.string().max(256),
})
