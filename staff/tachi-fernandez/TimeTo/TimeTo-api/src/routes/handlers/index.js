module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    updateUser: require('./update-user'),

    updateImage: require('./update-image'),

    deleteUser : require('./delete-user'),

    createEvent: require('./create-event'),

    listEvents : require('./list-events'),

    listEventsByQuery : require('./list-events-by-query'),

    listEventsById : require('./list-event-by-id'),

    toogleEvent: require('./toogle-events'),

    addComment : require('./add-comment'),

    listComments : require('./list-comments'),

    deleteComment : require('./delete-comment'),

    retrieveUserById : require('./retrieve-user-by-id'),

    notFound: require('./not-found')

}