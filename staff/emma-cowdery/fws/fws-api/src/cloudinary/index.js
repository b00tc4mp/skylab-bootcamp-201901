'use strict'

const cloudinary = require('cloudinary')

require('dotenv').config()

const { env: { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } } = process

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const uploadImage = (image) => {
    const cloudinaryOptions = {
        resource_type: 'raw'
    }

    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(cloudinaryOptions, function (error, result) {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }).end(image.buffer)
    })
}

module.exports = uploadImage