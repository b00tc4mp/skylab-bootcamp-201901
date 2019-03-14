'use strict'

const multer = require('multer')

function imageParser(req, res, next) {

	var storage = multer.memoryStorage()

	const upload = multer({ storage })

	const uploadFile = upload.single('image')

	uploadFile(req, res, function (err) {
		next()
	})
}

module.exports = imageParser