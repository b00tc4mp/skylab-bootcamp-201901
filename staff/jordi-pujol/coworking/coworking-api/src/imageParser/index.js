const multer = require('multer')
const path = require('path')

function imageParser(req, res, next) {

	const storage = multer.memoryStorage() 

	const limits = {
		files: 1,
		fileSize: 1024 * 1024,
	}

	const fileFilter = function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
			return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
	}

	const upload = multer({ storage, limits, fileFilter })

	const uploadFile = upload.single('image')

	uploadFile(req, res, function (err) {
		debugger
		if (err) return res.status(422).json({error: err.message})
		next()
	})
}

module.exports = imageParser 