import axios from 'axios';

const imageApi = {
	// url_cloudinary: 'https://api.cloudinary.com/v1_1/do6uedhjl/upload',
	// url_cloudinary_upload_preset: 'vutpkukq',

	url: 'http://localhost:8000/v1',

	uploadImage(image) {
		let formData = new FormData();
		formData.append('file', image);
		// formData.append('upload_preset', this.url_cloudinary_upload_preset);


		return axios.post(`${this.url}/image`, {
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			body: image,
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw Error(response.error);
				return response;
			});



		// return fetch({
		// 	url: `${this.url}/image`,
		// 	method: 'POST',
		// 	header: {
		// 		'Content-Type': 'multipart/form-data',
		// 	},
		// 	body: formData,
		// })
		// 	.then(response => response.json())
		// 	.then(response => {
		// 		debugger;
		// 		if (response.error) throw Error(response.error);
		// 		return response;
		// 	})
		// 	.catch(error => console.log(error));



		// let formData = new FormData();
		// formData.append('file', coverphoto);
		// formData.append('upload_preset', this.url_cloudinary_upload_preset);
		// return fetch({
		// 	url: this.url_cloudinary,
		// 	method: 'POST',
		// 	header: {
		// 		'Content-Type': 'application/x-www-form-urlencoded',
		// 	},
		// 	data: formData,
		// })
		// 	.then(response => response.json())
		// 	.then(response => {
		// 		debugger
		// 		if (response.error) throw Error(response.error);
		// 		return response;
		// 	}).catch(error => console.log(error))
	},
};

export default imageApi;
