const mongoose = require('../bootstrap/mongo')
const path = require('path')
const classicFs = require('fs')
const fs = require('fs').promises

const { fixtures } = require('../fixtures')

const hasFile = async filePath => {
  try {
    await fs.access(filePath, classicFs.constants.R_OK)
    return true
  } catch (e) {
    return false
  }
}

const initModulesModels = async filePath => {
  if ((await fs.lstat(filePath)).isFile()) {
    return
  }

  const modelFileName = `${filePath}/${path.parse(filePath).name}.model.js`
  if (await hasFile(modelFileName)) {
    require(modelFileName)
    return
  }

  const filesInFolder = await fs.readdir(filePath)

  for (const file of filesInFolder) {
    const folder = path.resolve(filePath, file)
    await initModulesModels(folder)
  }
}

const insertCollections = async (modelName, data) => {
  const db = mongoose.connection

  const Model = db.model(modelName)

  await Model.deleteMany({})

  await Model.create(data)
}

;(async () => {
  try {
    await initModulesModels(path.resolve(__dirname, '../modules'))
    for (const fixture of fixtures) {
      await insertCollections(fixture.model, fixture.data)
    }

    console.log('Fixtures were successfully updated')
    process.exit(0)
  } catch (e) {
    console.log(e.message)
  }
})()
