const AWS = require('aws-sdk')
const uuidv4 = require('uuid/v4')
const fs = require('fs')

module.exports = ({ config }) => {
  const S3 = new AWS.S3({
    params: {
      Bucket: config.S3_BUCKET,
    },
    accessKeyId: config.S3_ACCESS_KEY_ID,
    secretAccessKey: config.S3_SECRET_ACCESS_KEY,
  })

  const upload = async (filename = '', file) => {
    const imageToUpload = {
      Body: fs.createReadStream(file.path),
      Key: uuidv4() + '-' + filename + file.name,
      ACL: 'public-read',
    }

    const { Location: url } = await S3.upload(imageToUpload, {
      ACL: 'public-read',
    }).promise()

    return { url }
  }
  return {
    upload,
  }
}
