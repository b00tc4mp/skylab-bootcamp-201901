import auth from '../../services/auth';

const userApi = {
	url: 'NO_URL',

	signup(data) {
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
				return response.user;
			});
	},

	login(data) {
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

	retrieveUser() {
		return fetch(`${this.url}/auth/user`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
			},
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});
	},

	updateUser(data) {
		return fetch(`${this.url}/auth/user`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${auth.token}`,
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
