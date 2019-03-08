module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    retrieveUsers: require('./retrieve-users'),

    updateUser: require('./update-user'),

    removeUser: require('./remove-user'),

    createMessage: require('./create-message'),

    messageRead: require('./message-read'),

    messageDelete: require('./message-delete'),
    
    retrieveReceivedMessages: require('./retrieve-received-messages')


    // notFound: require('./not-found')
}