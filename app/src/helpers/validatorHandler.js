const Joi = require('joi')
const compose = require('koa-compose')
const { isEmpty, get } = require('lodash')

const { ValidationError } = require('@/helpers/errors')

/**
 * Add validation errors in ctx
 *
 * @param {Joi.scheme} scheme
 * @param {String} path in ctx to object for validate
 * @return {Promise<void>} koa middleware
 */
const checkErrors = (scheme, target = 'request.body') => async (ctx, next) => {
  try {
    const result = await Joi.validate(get(ctx, target), scheme, {
      abortEarly: false,
      allowUnknown: false,
    })
    ctx.body = result
  } catch (e) {
    throw new ValidationError(e.details)
  } finally {
    await next()
  }
}

/**
 * Throw validation error if ctx.validationErrors not empty
 *
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
const returnErrors = async (ctx, next) => {
  if (!isEmpty(ctx.validationErrors)) {
    const error = new ValidationError(ctx.validationErrors)
    throw error
  }

  await next()
}

/**
 * Composed middleware to check and throw validation error
 *
 * @param scheme
 * @return {Promise<void>}
 */
const checkAndThrow = (scheme, target) =>
  compose([checkErrors(scheme, target), returnErrors])

exports.validatorHandler = checkAndThrow
