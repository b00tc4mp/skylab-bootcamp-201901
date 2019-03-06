import userApi from '../../user-api';
import validate from '../../utils/validate';

const auth = {
	__userApiToken__: null,
	__user__: null,

	async signup(data) {
		const { name, surname, email, password } = data;

		validate([
			{ key: 'name', value: name, type: String },
			{ key: 'surname', value: surname, type: String },
			{ key: 'email', value: email, type: String },
			{ key: 'password', value: password, type: String },
		]);

		try {
			return await userApi.signup(data);
		} catch (error) {
			throw Error(error.message);
		}
	},

	async login(data) {
		const { email, password } = data;

		if (!email || !password) throw new Error('Incorrect email or password');

		validate([
			{ key: 'email', value: email, type: String },
			{ key: 'password', value: password, type: String },
		]);

		try {
			const { token, user } = await userApi.login(data);
			this.__userApiToken__ = token;
			this.__user__ = JSON.stringify(user);
		} catch (error) {
			throw Error(error.message);
		}
	},

	/**
	 * Checks user is logged in.
	 */
	get isUserLoggedIn() {
		return !!this.__userApiToken__;
	},

	/**
	 * Checks user is logged in.
	 */
	get userLoggedIn() {
		return !!this.__user__;
	},

	/**
	 * Logs out the user.
	 */
	logOutUser() {
		this.__userApiToken__ = null;
		this.__user__ = null;
	},
};

export default auth;
