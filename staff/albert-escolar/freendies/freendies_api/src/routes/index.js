module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    uploadGame: require('./uploadGame'),
    updateUser: require('./update-user'),
    retrieveGameByQuery: require('./retrieve-GameByQuery'),
    retrieveGameByGenre: require('./retrieve-GameByGenre'),
    retrieveGameById: require('./retrieve-GameById'),
    toggleFavs: require('./toggle-favs'),
    retrieveFavs: require('./retrieve-userFavs'),
    retrieveUploads: require('./retrieve-uploads')
}