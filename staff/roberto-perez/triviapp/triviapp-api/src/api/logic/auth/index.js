'use sctric';

const { User } = require('triviapp-data');
const validate = require('triviapp-validation');
const { AlreadyExistsError, UnauthorizedError } = require('triviapp-errors');

module.exports = {
	/**
	 *
	 * @param {String} name
	 * @param {String} surname
	 * @param {String} email
	 * @param {String} password
	 *
	 * @throws {TypeError} on non-string name, surname, email or password
	 * @throws {ValueError} on empty or blank name, surname, email or password
	 * @throws {AlreadyExistsError} on already registered email
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	signupUser(data) {
		const { name, surname, email, password } = data;

		validate([
			{ key: 'name', value: name, type: String },
			{ key: 'surname', value: surname, type: String },
			{ key: 'email', value: email, type: String },
			{ key: 'password', value: password, type: String },
		]);

		return (async data => {
			try {
				const userAdd = new User(data);
				const savedUser = await userAdd.save();
				return savedUser.normalize();
			} catch (error) {
				if (error.name === 'MongoError' && error.code === 11000) {
					throw new AlreadyExistsError(
						`User with email ${email} already exists`,
					);
				}
				throw new Error(error);
			}
		})(data);
	},

	/**
	 *
	 * @param {String} email
	 * @param {String} password
	 *
	 * @throws {TypeError} on non-string email or password
	 * @throws {ValueError} on empty or blank email or password
	 * @throws {UnauthorizedError} on invalid username or password
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	loginUser(data) {
		const { email, password } = data;

		if (!email || !password)
			throw new UnauthorizedError('Incorrect email or password');

		validate([
			{ key: 'email', value: email, type: String },
			{ key: 'password', value: password, type: String },
		]);

		return (async data => {
			const { user, token } = await User.findAndGenerateToken(data);
			const userTransformed = user.normalize();
			return { token, user: userTransformed };
		})(data);
	},

	/**
	 *
	 * @param {String} userId
	 *
	 * @throws {TypeError} on non-string userId
	 * @throws {ValueError} on empty or blank userId
	 * @throws {NotFoundError} on non existing user with that userId
	 *
	 * @returns {Promise} resolves on correct data rejects on wrong data
	 */
	retrieveUser(userId) {
		validate([{ key: 'User ID', value: userId, type: String }]);

		return (async () => {
			const user = await User.get(userId);
			return user.normalize();
		})();
	},

	/**
     * 
     * @param {String} userId 
     * @param {Object} data
     * 
     * @throws {TypeError} on non-string name, surname, email, image
     * @throws {ValueError} on empty or blank name, surname, email
     * @throws {Error} on passwords do not match
     * 
     * @returns {Promise} resolves on correct data rejects on wrong data
     */
	updateUser(userId, data = {}) {
		const { name, surname, email, image, password, confirmPassword } = data;

		if (image) {
			data.picture = image;
			delete data.image;
		}

		if (!password) {
			delete data.password;
		}

		delete data.confirmPassword;

		validate([
			{ key: 'Name', value: name, type: String, optional: true },
			{ key: 'Surname', value: surname, type: String, optional: true },
			{ key: 'Email', value: email, type: String, optional: true },
			{ key: 'Image', value: image, type: String, optional: true },
		]);

		if (password) {
			validate([
				{ key: 'Password', value: password, type: String },
				{ key: 'Confirm password', value: confirmPassword, type: String },
			]);

			if (password !== confirmPassword) throw Error('Passwords do not match');
		}

		return (async () => {
			const user = await User.findByIdAndUpdate(userId, data, { new: true });
			return user.normalize();
		})();
	},
};
