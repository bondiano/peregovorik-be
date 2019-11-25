const swaggerJSDoc = require('swagger-jsdoc')
const { ui } = require('swagger2-koa')

exports.moduleFabric = app => {
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
      openapi: '3.0.1',
      basePath: '/',
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
}
