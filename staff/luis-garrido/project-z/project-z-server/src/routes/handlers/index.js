module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    searchGames: require('./search-games'),

    retrieveGameInfo: require('./retrieve-game-info'),

    postReview: require('./post-review'),

    rankingGames: require('./ranking-games'),

    retrieveUserByUsername: require('./retrieve-user-by-username')

    // listCommentsFromArtist: require('./list-comments-from-artist'),

    // TODO other route handlers

    // notFound: require('./not-found')
}