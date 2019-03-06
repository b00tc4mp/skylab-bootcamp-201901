module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    updateUser: require('./update-user'),

    deleteUser : require('./delete-user'),

    createEvent: require('./create-event'),

    listEvents : require('./list-events'),

    listEventsByQuery : require('./list-events-by-query'),

    listEventsById : require('./list-event-by-id'),

    addComment : require('./add-comment'),

    listComments : require('./list-comments'),

    deleteComment : require('./delete-comment'),

    notFound: require('./not-found')

}