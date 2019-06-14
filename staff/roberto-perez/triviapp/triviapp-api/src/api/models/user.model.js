'use strict';

const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const { UnauthorizedError } = require('../errors');

const roles = ['user', 'admin'];

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			match: /^\S+@\S+\.\S+$/,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
			maxlength: 128,
			index: true,
			trim: true,
		},
		surname: {
			type: String,
			required: true,
			maxlength: 128,
			trim: true,
		},
		role: {
			type: String,
			enum: roles,
			default: 'user',
		},
		picture: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true },
);


userSchema.pre('save', async function() {
	try {
		if (!this.isModified()) return;
		const hash = await bcrypt.hash(this.password, 10);
		this.password = hash;
	} catch (error) {
		return new Error(error);
	}
});


userSchema.method({
	normalize() {
		const user = {};
		const fields = ['id', 'name', 'email', 'picture', 'role', 'createdAt'];

		fields.forEach(field => (user[field] = this[field]));

		return user;
	},
	token() {
		return jwt.sign({ sub: this._id }, jwtSecret, {
			expiresIn: jwtExpirationInterval,
		});
	},
	async passwordCompare(password) {
		return bcrypt.compare(password, this.password);
	},
});


userSchema.statics = {
	roles,

	async get(id) {
		try {
			let user = await this.findById(id).exec();

			if (user) {
				return user;
			}

			throw new Error({
				message: 'User does not exist',
				status: httpStatus.NOT_FOUND,
			});
		} catch (error) {
			throw error;
		}
	},


	async findAndGenerateToken(options) {
		const { email, password } = options;

		const err = {};

		if (!email) {
			err.message = 'An email is required';
			throw new UnauthorizedError(err.message);
		}

		const user = await this.findOne({ email }).exec();

		if (password) {
			if (user && (await user.passwordCompare(password))) {
				return { user, token: user.token() };
			}
			err.message = 'Incorrect email or password';
		}

		throw new UnauthorizedError(err.message);
	},
};


module.exports = {
	User: mongoose.model('User', userSchema),
	userSchema
};
