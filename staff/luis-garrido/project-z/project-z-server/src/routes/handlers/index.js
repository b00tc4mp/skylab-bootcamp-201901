module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    searchGames: require('./search-games'),

    retrieveGameInfo: require('./retrieve-game-info'),

    postReview: require('./post-review'),

    rankingGames: require('./ranking-games'),

    retrieveUserByUsername: require('./retrieve-user-by-username'),

    retrieveRandomGame: require('./retrieve-random-game'),

    retrievePredictedScore: require('./retrieve-predicted-score'),

    retrieveEuclideanDistance: require('./retrieve-euclidean-distance')

    // TODO other route handlers

    // notFound: require('./not-found')
}