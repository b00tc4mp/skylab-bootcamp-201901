// import .env variables
require('dotenv').load();

const {
	env: { NODE_ENV, PORT, JWT_SECRET, JWT_EXPIRATION_HOURS, MONGO_URI_TESTS, MONGO_URI, CLOUD_NAME, API_KEY, API_SECRET },
} = process;

module.exports = {
	env: NODE_ENV,
	port: PORT,
	jwtSecret: JWT_SECRET,
	jwtExpirationInterval: JWT_EXPIRATION_HOURS,
	mongo: {
		uri: NODE_ENV === 'test' ? MONGO_URI_TESTS : MONGO_URI,
	},
	logs: NODE_ENV === 'production' ? 'combined' : 'dev',
	cloudName: CLOUD_NAME,
	apiKey: API_KEY,
	apiSecret:API_SECRET,
};
