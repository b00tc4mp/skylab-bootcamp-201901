module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    retrieveUserLogged: require('./retrieve-user-logged'),

    updateUser:require('./update-user'),

    addJourney: require('./add-journey'),

    retrieveJourney: require('./retrieve-journey'),

    listJourneys: require('./list-journeys'),

    searchJourneys: require('./search-journeys'),

    updateJourney: require('./update-journey'),

    deleteJourney: require('./delete-journey'),

    notFound: require('./not-found'),
}