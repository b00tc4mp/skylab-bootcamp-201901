module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    updateUser: require('./update-user'),

    removeUser: require('./remove-user'),

    createMessage: require('./create-message'),

    messageRead: require('./message-read'),

    messageDelete: require('./message-delete')


    // notFound: require('./not-found')
}