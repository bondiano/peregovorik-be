const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const passport = require('koa-passport')

const app = new Koa()
const config = require('../config')

const { registerModules } = require('../modules')

app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(logger())
}

app.use(cors())

app.use(
  bodyParser({
    enableTypes: ['json'],
    onerror: (err, ctx) => {
      ctx.throw('body parse error', err, 422)
    },
  }),
)

app.use(passport.initialize())

registerModules(app)

app.listen(config.PORT, () =>
  console.log(`PEREGOVORKI API started on ${config.PORT}`),
)
