module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    createEvent: require('./create-event'),

    joinEvent: require('./join-event'),

    userEvents: require('./user-events'),

    createChat: require('./create-chat'),

    joinChat: require('./join-chat'),

    userChats: require('./user-chats'),

    addMessageToChat: require('./add-message-to-chat'),

    uploadImage: require('./upload-image'),

    notFound: require('./not-found')
}