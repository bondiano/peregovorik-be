require('dotenv').config()

exports.PORT = process.env.PORT

exports.MONGO_DB_PORT = process.env.MONGO_DB_PORT
exports.MONGO_DB_URL = process.env.MONGO_DB_URL

exports.JWT_SECRET = process.env.JWT_SECRET
exports.JWT_EXPIRESIN = process.env.JWT_EXPIRESIN

exports.BASE_URL = process.env.BASE_URL || ''

exports.S3_BUCKET = process.env.S3_BUCKET
exports.S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID
exports.S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY
