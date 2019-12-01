const Router = require('koa-router')

const modulesHelper = require('../helpers/modules')

const modules = require('./modules')

const registerRoutes = (app, controllers, baseRoute = '/', handlers = []) => {
  const router = new Router({
    prefix: baseRoute,
  })

  controllers.forEach(controller => {
    const method = controller.method.toLowerCase()

    router[method](controller.path, ...handlers, ...controller.handlers)
  })

  app.use(router.routes()).use(router.allowedMethods())
}

const registerModules = (app, handlers) => {
  const modulesMeta = modules.map(({ moduleMeta }) => moduleMeta)
  const dependenciesQueue = modulesHelper.resolveDependsToQueue(modulesMeta)

  const orderedModules = dependenciesQueue.map(({ name }) =>
    modules.find(({ moduleMeta }) => moduleMeta.name === name),
  )

  const exportDataByModule = {}

  for (let module of orderedModules) {
    const { name, dependsOn, baseRoute } = module.moduleMeta

    const dependsOnData =
      dependsOn &&
      dependsOn.reduce((acc, depName) => {
        acc[depName] = exportDataByModule[depName]
        return acc
      }, {})

    const moduleData = module.moduleFabric(app, dependsOnData) || {}
    exportDataByModule[name] = moduleData.exports

    if (moduleData.controller) {
      registerRoutes(app, moduleData.controller, baseRoute, handlers)
    }

    console.log(`[MODULE]: ${name} was registered`)
  }
}

exports.registerModules = registerModules
