const express = require('express');

const cloudinaryUploader = require('../../midelware/cloudinary')

const controller = require('../../controllers/image.controller');

const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router
	.route('/')
	.post(upload.single('image'), cloudinaryUploader, controller.upload);

module.exports = router;
