const { mongoose } = require('triviapp-data');
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
exports.connect = async (uri) => {

	mongoUrl = (uri) ? uri : mongo.uri;

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
