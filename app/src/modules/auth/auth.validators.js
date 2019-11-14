const Joi = require('joi')

const usernameRules = Joi.string()
  .required()
  .min(2)
  .max(20)
const passwordRules = Joi.string()
  .required()
  .min(8)
  .max(256)
const emailRules = Joi.string().email({ minDomainAtoms: 2 })

exports.loginSchema = Joi.object().keys({
  username: usernameRules,
  password: passwordRules,
})

exports.createUserSchema = Joi.object().keys({
  username: usernameRules,
  password: passwordRules,
  email: emailRules.required(),
})
