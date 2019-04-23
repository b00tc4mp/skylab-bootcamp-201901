require('dotenv');

const {
	env: { JWT_SECRET, JWT_EXPIRATION_HOURS, MONGO_URI },
} = process;

module.exports = {
	jwtSecret: JWT_SECRET,
	jwtExpirationInterval: JWT_EXPIRATION_HOURS,
	mongo: {
		uri: MONGO_URI,
	},
};
