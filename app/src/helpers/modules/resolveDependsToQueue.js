const { DepGraph } = require('dependency-graph')

/**
 * @typedef {Object} Module
 * @property {string} name
 * @property {Array<string>} dependsOf
 */

/**
 * @param {Array<Module>} modules
 */
const createModulesGraph = modules => {
  const graph = new DepGraph()

  for (let module of modules) {
    if (graph.hasNode(module.name)) {
      graph.setNodeData(module.name, module)
    } else {
      graph.addNode(module.name, module)
    }

    if (!module.dependsOn || !module.dependsOn.length) {
      continue
    }

    for (let dependency of module.dependsOn) {
      if (!graph.hasNode(dependency)) {
        graph.addNode(dependency)
      }

      graph.addDependency(dependency, module.name)
    }
  }

  return graph
}

/**
 * @param {Array<Module>} modules
 */
const resolveDependsToQueue = modules => {
  const graph = createModulesGraph(modules)

  const overallOrder = graph.overallOrder().reverse() // It must be a queue as I want :D

  return overallOrder.map(name => {
    return modules.find(module => module.name === name)
  })
}

exports.resolveDependsToQueue = resolveDependsToQueue
