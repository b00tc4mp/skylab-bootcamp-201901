module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    updateUser: require('./update-user'),

    createHouse: require('./create-house'),

    updateHouse: require('./update-house'),
    
    retrieveHouse: require('./retrieve-house'),

    deleteHouse: require('./delete-house'),

    notFound: require('./not-found'),

    toggleFavorite : require('./toggle-favorites'),

    retrieveMyHouses: require('./retrieve-user-myHouses'),

    retrieveFavorites: require('./retrieve-user-favorites'),

    retrieveHousesByQuery: require('./retrieve-housesQuery'),
}