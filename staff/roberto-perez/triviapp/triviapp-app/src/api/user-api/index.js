import auth from '../../services/auth';

const validate = require('triviapp-validation');
const { AlreadyExistsError, UnauthorizedError } = require('triviapp-errors');

const userApi = {
	url: 'NO_URL',

	signup(data) {
		const { name, surname, email, password } = data;

		validate([
			{ key: 'name', value: name, type: String },
			{ key: 'surname', value: surname, type: String },
			{ key: 'email', value: email, type: String },
			{ key: 'password', value: password, type: String },
		]);

		return fetch(`${this.url}/auth/signup`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	login(data) {
		const { email, password } = data;

		if (!email || !password)
			throw new UnauthorizedError('Incorrect email or password');

		validate([
			{ key: 'email', value: email, type: String },
			{ key: 'password', value: password, type: String },
		]);

		return fetch(`${this.url}/auth/login`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return { token: response.token, user: response.user };
			});
	},

	retrieveUser(token) {
		return fetch(`${this.url}/auth/user`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	updateUser(token, data) {
		const { name, surname, email, image, password, confirmPassword } = data;

		if (image) {
			data.picture = image;
			delete data.image;
		}

		if (!password) {
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

		return fetch(`${this.url}/auth/user`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},
};

export default userApi;
