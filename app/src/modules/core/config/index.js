const config = require('../../../config')

exports.moduleFabric = () => {
  return {
    exports: config,
  }
}

exports.moduleMeta = {
  name: 'config',
}
