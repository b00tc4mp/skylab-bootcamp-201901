import auth from '../services/auth';

const imageApi = {
	url: 'http://localhost:8000/v1',

	uploadImage(image) {
		let formData = new FormData();
		formData.append('image', image);

		return fetch(`${this.url}/image`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${auth.token}`,
			},
			body: formData,
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw new Error(response.error);

				return response;
			});
	},
};

export default imageApi;
