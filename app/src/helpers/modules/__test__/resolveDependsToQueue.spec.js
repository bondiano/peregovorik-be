const test = require('ava')

const { resolveDependsToQueue } = require('../resolveDependsToQueue')

const isCorrectOrder = (expected, result) =>
  expected.every((name, index) => name === result[index].name)

test('should return array', t => {
  const result = resolveDependsToQueue([])
  t.assert(Array.isArray(result))
})

test('should add all modules to result array', t => {
  const modules = [
    {
      name: 'foo',
    },
    {
      name: 'bar',
    },
  ]

  const result = resolveDependsToQueue(modules)

  const isAllIn =
    result.length === modules.length &&
    modules.every(module => result.includes(module))

  t.assert(isAllIn)
})

test('should make queue by dependsOn filed', t => {
  const modules = [
    {
      name: 'foo',
    },
    {
      name: 'bar',
      dependsOn: ['meow'],
    },
    {
      name: 'meow',
      dependsOn: ['foo'],
    },
    {
      name: 'bow',
      dependsOn: ['foo'],
    },
  ]
  const expected = ['foo', 'bow', 'meow', 'bar']

  const result = resolveDependsToQueue(modules)

  t.assert(isCorrectOrder(expected, result))
})

test('should correct resolve rhombus-shape dependencies graph', t => {
  const modules = [
    {
      name: 'foo',
    },
    {
      name: 'bar',
      dependsOn: ['foo'],
    },
    {
      name: 'meow',
      dependsOn: ['foo'],
    },
    {
      name: 'bow',
      dependsOn: ['meow', 'bar'],
    },
  ]
  const expected = ['foo', 'meow', 'bar', 'bow']

  const result = resolveDependsToQueue(modules)

  t.assert(isCorrectOrder(expected, result))
})
