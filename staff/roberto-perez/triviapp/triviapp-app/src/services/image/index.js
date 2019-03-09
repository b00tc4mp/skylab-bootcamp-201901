import imageApi from '../../image-api';

const image = {
	
	async upload(image) {
		try {
			return await imageApi.uploadImage(image);
		} catch (error) {
			throw Error(error.message);
		}
	},
	
};

export default image;
