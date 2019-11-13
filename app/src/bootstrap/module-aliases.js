const path = require('path')
const moduleAlias = require('module-alias')

moduleAlias.addAliases({
  '@': path.dirname(__dirname),
})

moduleAlias()
