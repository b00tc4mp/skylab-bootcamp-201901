'use strict'

const multer = require('multer')
const path = require('path')


function imageParser(req, res, next) {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    const upload = multer({ storage: storage })

    const uploadFile = upload.single('image')

    uploadFile(req, res, function (err) {
        if (err) throw Error(err)

        next()
    })

}

module.exports = imageParser