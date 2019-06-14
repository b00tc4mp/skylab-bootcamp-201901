import imageApi from '../../api/image-api';
import auth from '../auth';
const image = {
	
	async upload(image) {
		try {
			return await imageApi.uploadImage(auth.__userApiToken__, image);
		} catch (error) {
			throw Error(error.message);
		}
	},
	
};

export default image;
