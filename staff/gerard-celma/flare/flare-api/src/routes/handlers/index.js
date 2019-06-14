module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    retrieveUsers: require('./retrieve-users'),

    updateUser: require('./update-user'),

    updateUserPhoto: require('./update-user-photo'),

    removeUser: require('./remove-user'),

    createMessage: require('./create-message'),

    uploadMessagePhoto: require('./upload-message-photo'),

    messageRead: require('./message-read'),

    messageDelete: require('./message-delete'),
    
    retrieveReceivedMessages: require('./retrieve-received-messages'),

    retrieveSentMessages: require('./retrieve-sent-messages'),

    retrieveAllMessages: require('./retrieve-all-messages')


    // notFound: require('./not-found')
}