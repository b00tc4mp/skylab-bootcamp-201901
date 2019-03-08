import imageApi from '../../image-api';

const image = {
	
	async upload(data) {
		try {
			return await imageApi.uploadImage(data);
		} catch (error) {
			throw Error(error.message);
		}
	},
	
};

export default image;
