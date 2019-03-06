module.exports = {
    registerUser: require('./register-user'),

    registerPet: require('./register-pet'),

    authenticateUser: require('./authenticate-user'),

    retrieveUsers: require('./retrieve-users'),
    
    retrieveUser: require('./retrieve_user'),

    retrievePets: require('./retrieve-pets'),

    updateUser: require('./update-user'),
      // TODO other route handlers

    notFound: require('./not-found')
}