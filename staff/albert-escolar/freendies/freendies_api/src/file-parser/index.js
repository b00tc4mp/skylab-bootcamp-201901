'use strict'

const path = require('path')

const multer = require('multer')

const storage = multer.memoryStorage() 

// const limits = {
// 	files: 1,
// 	fileSize: 1024 * 1024,
// }

// const fileFilter = function (req, file, callback) {
// 	var ext = path.extname(file.originalname);
// 	if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
// 		return callback(new Error('Only images are allowed'))
// 	}
// 	callback(null, true)
// }

const upload = multer({ storage })

const uploadFile = upload.any(['title', 'description', 'images', 'genre', 'gameFile'])

function fileParser(req, res, next) {
	uploadFile(req, res, function (err) {
		if (err) return res.status(422).json({error: err.message})
		next()
	})
}

module.exports = fileParser