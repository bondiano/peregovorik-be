const swaggerJSDoc = require('swagger-jsdoc')
const { ui } = require('swagger2-koa')

exports.moduleFabric = (app, { config }) => {
  const options = {
    definition: {
      servers: [
        {
          url: config.BASE_URL,
        },
      ],
      info: {
        title: 'Peregovorki api',
        version: '1.0.0',
        description: 'Peregovorki api specification',
        contact: {
          name: 'bondiano',
          email: 'batbondik0@gmail.com',
        },
      },
      openapi: '3.0.1',
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['./**/*.controller.js', './**/*.model.js', './**/*.validators.js'],
  }

  const swaggerDoc = swaggerJSDoc(options)

  app.use(ui(swaggerDoc, '/doc'))
}

exports.moduleMeta = {
  name: 'swagger',
  baseRoute: '/doc',
  dependsOn: ['config'],
}
