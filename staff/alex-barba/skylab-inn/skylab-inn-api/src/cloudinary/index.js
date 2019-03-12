'use strict'

require('dotenv').config()

const cloudinary = require('cloudinary').v2

const { env: { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } } = process

function cloudinaryUploader(req, res, next) {
    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET
    })

    const path = req.file.path

    try {
        cloudinary.uploader.upload(
            path,
            function (err, image) {
                if (err) return req.send(err)
        
                const fs = require('fs')
                fs.unlinkSync(path)

                req.image = image
                next()
            })
    } catch ({ message }) {
        return res.status(401).json({ error: message })
    }


}

module.exports = cloudinaryUploader