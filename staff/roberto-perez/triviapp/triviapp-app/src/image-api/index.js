
const imageApi = {
	url_cloudinary:'https://api.cloudinary.com/v1_1/do6uedhjl/upload',
   	url_cloudinary_upload_preset :'vutpkukq',

	uploadImage(coverphoto) {
		debugger
		let formData = new FormData();
		formData.append('file', coverphoto);
		formData.append('upload_preset', this.url_cloudinary_upload_preset);
		return fetch({
			url: this.url_cloudinary,
			method: 'POST',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: formData,
		})
			.then(response => response.json())
			.then(response => {
				debugger
				if (response.error) throw Error(response.error);
				return response;
			}).catch(error => console.log(error))
	},
};

export default imageApi;
