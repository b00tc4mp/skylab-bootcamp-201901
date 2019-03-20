'use strict';

const httpStatus = require('http-status');

const { cloudName, apiKey, apiSecret } = require('../../config/vars');

const streamifier = require('streamifier');

const cloudinary = require('cloudinary').v2;

function cloudinaryUploader(req, res, next) {
	cloudinary.config({
		cloud_name: cloudName,
		api_key: apiKey,
		api_secret: apiSecret,
	});

	const path = req.file.buffer;

	try {
		const upload_stream = cloudinary.uploader.upload_stream({ width: 800, height: 800, crop: "fill" }, function(err, image) {
			if (err) throw new Error(`Image could not be uploaded: ${err}`);
			req.image = image;
			next();
		});
		streamifier.createReadStream(path).pipe(upload_stream)

	} catch ({ message }) {
		return res.status(httpStatus.UNAUTHORIZED).json({ error: message });
	}
}

module.exports = cloudinaryUploader;
