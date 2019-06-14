module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    retrieveUserLogged: require('./retrieve-user-logged'),

    updateUser: require('./update-user'),

    updateBoat: require('./update-boat'),

    updateUserPicture: require('./update-user-picture'),

    updateBoatPicture: require('./update-boat-picture'),

    searchUsers: require('./search-users'),

    addJourney: require('./add-journey'),

    retrieveJourney: require('./retrieve-journey'),

    myJourneys: require('./my-journeys'),

    searchJourneys: require('./search-journeys'),

    updateJourney: require('./update-journey'),

    deleteJourney: require('./delete-journey'),

    toggleFavoriteJourney: require('./favorite-journey'),

    toggleFavoriteCrew: require('./favorite-crew'),

    notFound: require('./not-found'),
}