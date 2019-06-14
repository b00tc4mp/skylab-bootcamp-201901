'use strict'

require('dotenv').config()

const streamifier = require('streamifier')
const cloudinary = require('cloudinary').v2
const { env: { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } } = process

function cloudinaryUploader(req, res, next) {
    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET
    })

    const path = req.file.buffer

    const upload_stream= cloudinary.uploader.upload_stream(function(err,image) {
            req.image = image
            next()
    })

    streamifier.createReadStream(path).pipe(upload_stream)
}

module.exports = cloudinaryUploader