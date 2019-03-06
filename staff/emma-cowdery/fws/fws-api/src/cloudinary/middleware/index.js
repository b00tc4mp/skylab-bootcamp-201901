const multer = require('multer')

multer({
    limits: {
      fileSize: 10 * 1024 * 1024    // Equivalent of 1MB
    }
})

const upload = multer()

const parseImageUpload = (req, res) => {
    return upload.single('image')
}

module.exports = parseImageUpload