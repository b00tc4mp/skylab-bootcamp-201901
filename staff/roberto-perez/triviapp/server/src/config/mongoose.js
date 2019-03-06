const mongoose = require('mongoose');
const { mongo } = require('./vars');

/**
 * Disconnect to mongo db
 *
 * @returns {object} Mongoose disconnection
 * @public
 */
exports.disconnect = async () => {
	return mongoose.disconnect();
};

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = async () => {
	try {
		await mongoose.connect(mongo.uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
		});
	} catch (error) {
		console.error(error);
	}
	return mongoose.connection;
};
