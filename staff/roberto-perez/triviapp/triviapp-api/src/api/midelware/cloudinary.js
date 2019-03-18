'use strict';

const httpStatus = require('http-status');

const { cloudName, apiKey, apiSecret } = require('../../config/vars');

const cloudinary = require('cloudinary').v2;

function cloudinaryUploader(req, res, next) {
	cloudinary.config({
		cloud_name: cloudName,
		api_key: apiKey,
		api_secret: apiSecret,
	});

	const path = req.file.path;

	try {
		cloudinary.uploader.upload(path, { width: 800, height: 800, crop: "fill" }, function(err, image) {
			if (err) return req.send(err);
			console.log('file uploaded to Cloudinary');
			// remove file from server
			const fs = require('fs');
			fs.unlinkSync(path);
			// return image details
			req.image = image;
			next();
		});
	} catch ({ message }) {
		return res.status(httpStatus.UNAUTHORIZED).json({ error: message });
	}
}

module.exports = cloudinaryUploader;
