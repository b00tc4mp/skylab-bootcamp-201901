module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    updateUser: require('./update-user'),

    createEvent: require('./create-event'),

    joinEvent: require('./join-event'),

    userEvents: require('./user-events'),

    findEventByCategory: require('./find-event-by-category'),

    findEventsNearMe: require('./find-events-near-me'),

    createChat: require('./create-chat'),

    joinChat: require('./join-chat'),

    userChats: require('./user-chats'),

    addMessageToChat: require('./add-message-to-chat'),

    messagesFromChat: require('./messages-from-chat'),

    searchRestaurants: require('./search-restaurants'),

    restaurantDetails: require('./restaurant-details'),

    resizePhoto: require('./resize-photo'),

    geolocation: require('./geolocation'),

    dontShowHowTo: require('./dont-show-how-to'),

    howTo: require('./how-to'),

    filterEvents: require('./filter-events'),

    notFound: require('./not-found'),

    updateProfilePicture: require('./update-profile-picture'),

    retrieveUserWithId: require('./retrieve-user-with-id'),

    retrieveEvents: require('./retrieve-events')
}