const express = require('express');

const cloudinaryUploader = require('../../midelware/cloudinary')

const controller = require('../../controllers/image.controller');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// var multer  = require('multer')

// var busboy = require('busboy');

// var storage = multer.memoryStorage()
// var upload = multer({ storage: storage })

const router = express.Router();

/**
 * Load quiz when API with quizId route parameter is hit
 */

router
	.route('/')
	.post(upload.single('image'), cloudinaryUploader, controller.upload);

module.exports = router;
