const registerModules = async app => {
  const router = new Router()

  router.get('/', ctx => {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
  })

  app.use(router.routes()).use(router.allowedMethods())
}
