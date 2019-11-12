# Modules

## modules.js

You have to require your module to array in `modules.js`.

```javascript
const modules = [require('./your-module/path')]
```

## Module

Every module should export `moduleFabric` function for init module and `moduleMeta` object with info.

```javascript
exports.moduleFabric = (app, { ...deps }) => {
  ...
  return {
    controller: createController(),
    exports: {},
  }
}

exports.moduleMeta = {
  name: 'name',
  baseRoute: '/',
  dependsOn: ['depsOn'],
}
```
