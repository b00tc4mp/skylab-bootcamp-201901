const userApi = {
	url: 'http://localhost:8000/v1',

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
};

export default userApi;
