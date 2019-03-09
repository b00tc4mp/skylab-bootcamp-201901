const { User } = require('../../models/user.model');
const validate = require('../../utils/validate');
const { AlreadyExistsError, UnauthorizedError } = require('../../errors');

/**
 * Abstraction of auth logic.
 */
module.exports = {
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
};
