const modulesHelper = require('../helpers/modules')

const modules = require('./modules')

const registerRoutes = (app, controllers, baseRoute = '/') => {
  const router = new Router({
    prefix: baseRoute,
  })

  Object.values(controllers).forEach(controller => {
    const method = controller.method.toLowerCase()

    router[method](controller.path, ...controller.handlers)
  })

  app.use(router.routes()).use(router.allowedMethods())
}

const registerModules = app => {
  const dependenciesQueue = modulesHelper.resolveDependsToQueue(modules.meta)
  const orderedModules = dependenciesQueue.map(
    ({ name }) => modules.meta.name === name,
  )

  const exportDataByModule = {}

  for (let module of orderedModules) {
    const { name, dependsOn, baseRoute } = module.meta

    const dependsOnData = dependsOn.reduce((acc, depName) => {
      acc[depName] = exportDataByModule[depName]
    }, {})

    const moduleData = module.moduleFabric(app, dependsOnData)
    exportDataByModule[name] = moduleData.exports

    if (moduleData.controllers) {
      registerRoutes(app, moduleData.controllers, baseRoute)
    }
  }
}
