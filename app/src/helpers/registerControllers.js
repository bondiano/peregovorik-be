const registerControllers = controllerModule => {
  const controllers = []
  let dependencies

  controllerModule.exports = deps => {
    dependencies = deps
    return controllers
  }

  return (method, path, ...handlers) => {
    const handlersWithDeps = handlers.reduce((acc, handler) => {
      const handlerWithDeps = (ctx, next) => handler(ctx, next, dependencies)
      acc.push(handlerWithDeps)
      return acc
    }, [])

    controllers.push({
      method,
      path,
      handlers: handlersWithDeps,
    })
  }
}

exports.registerControllers = registerControllers
