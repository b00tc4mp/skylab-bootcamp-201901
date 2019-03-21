import userApi from '../../api/user-api';
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

		return await userApi.signup(data);
	},

	async login(data) {
		const { email, password } = data;
		if (!email || !password) throw new Error('Incorrect email or password');

		validate([
			{ key: 'email', value: email, type: String },
			{ key: 'password', value: password, type: String },
		]);

		const { token, user } = await userApi.login(data);

		this.__userApiToken__ = token;
		this.__user__ = JSON.stringify(user);
		return { token, user };
	},

	async retrieveUser() {
		return userApi.retrieveUser(this.__userApiToken__);
	},

	async updateUser(data) {
		const { name, surname, email, image, password, confirmPassword } = data;

		if (image) {
			data.picture = image;
			delete data.image;
		}

		if (!password || password === '') {
			delete data.password;
			delete data.confirmPassword;
		}

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

		const user = await userApi.updateUser(this.__userApiToken__, data);

		this.__user__ = JSON.stringify(user);

		return user;
	},

	/**
	 * Checks user is logged in.
	 */
	get isUserLoggedIn() {
		return !!this.__userApiToken__;
	},

	/**
	 * Return user token.
	 */
	get token() {
		return this.__userApiToken__;
	},

	/**
	 * Return user logged in.
	 */
	get userLoggedIn() {
		return this.__user__;
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
