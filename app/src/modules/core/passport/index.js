const passport = require('koa-passport')

const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const { UserNotFound, InvalidCredentials } = require('./exceptions')

exports.moduleFabric = (app, { users, config }) => {
  const optionsJWT = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
  }

  passport.use(
    new JWTStrategy(optionsJWT, async (payload, done) => {
      try {
        const user = await users.services.getById(payload.id)
        console.log('user', user)
        if (!user) {
          throw new UserNotFound()
        }

        return done(null, user)
      } catch (error) {
        return done(error, false)
      }
    }),
  )

  passport.use(
    new LocalStrategy({ session: false }, async (username, password, done) => {
      try {
        const isValidPassword = await users.services.verifyPassword(
          username,
          password,
        )

        if (!isValidPassword) {
          throw new InvalidCredentials()
        }

        const user = await users.services.findOne({ username })

        done(null, user)
      } catch (error) {
        return done(error, false)
      }
    }),
  )
}

exports.moduleMeta = {
  name: 'passport',
  dependsOn: ['users', 'jwt', 'config'],
}
