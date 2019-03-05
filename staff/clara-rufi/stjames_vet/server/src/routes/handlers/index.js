module.exports = {
    registerUser: require('./register-user'),

    registerPet: require('./register-pet'),

    authenticateUser: require('./authenticate-user'),

    retrieveUsers: require('./retrieve-users'),
    
    retrieveUser: require('./retrieve_user'),

    updateUser: require('./update-user'),
      // TODO other route handlers

    notFound: require('./not-found')
}