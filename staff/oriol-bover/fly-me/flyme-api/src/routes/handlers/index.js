module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    updateUser: require('./update-user'),
    deleteUser: require('./delete-user'),
    addDrone: require('./add-drone'),
    retrieveDrones: require('./retrieve-drones'),
    retrieveDronesUser: require('./retrieve-drones-user'),
    notFound: require('./not-found')
}