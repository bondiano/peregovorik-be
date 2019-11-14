const express = require('express')
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const config = require('../config')

const swaggerApp = express()
swaggerApp.use(cors())

const options = {
  definition: {
    info: {
      title: 'Peregovorki api',
      version: '1.0.0',
      description: 'Peregovorki api specification',
      contact: {
        name: 'bondiano',
        email: 'batbondik0@gmail.com',
      },
    },
    servers: [],
  },
  apis: ['../modules/**/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

swaggerApp.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

swaggerApp.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

swaggerApp.listen(
  config.SWAGGER_PORT,
  config.SWAGGER_HOST,
  `Swagger listen: ${config.SWAGGER_HOST}:${config.SWAGGER_PORT}`,
)

process.on('SIGINT', async () => {
  await swaggerApp.close()
  process.exit(0)
})
