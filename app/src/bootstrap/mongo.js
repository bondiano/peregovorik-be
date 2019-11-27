const mongoose = require('mongoose')
const { MONGO_DB_PORT, MONGO_DB_URL } = require('../config')

mongoose.connect(`mongodb://${MONGO_DB_URL}:${MONGO_DB_PORT}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('CONNECTED')
})

module.exports = mongoose
