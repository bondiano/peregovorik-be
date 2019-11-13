const passport = require('passport')
const { UnauthorizedError } = require('./errors')

exports.authHandler = (ctx, next) =>
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user) {
      throw new UnauthorizedError()
    }

    ctx.user = user
    return next()
  })(ctx, next)
