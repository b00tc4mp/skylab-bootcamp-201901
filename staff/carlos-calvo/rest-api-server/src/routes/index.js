module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    searchArtists: require('./search-artists'),

    retrieveArtist: require('./retrieve-artist'),

    addCommentToArtist: require('./add-comment-to-artist'),

    retrievesingleArtist: require('./retrievesingleArtist'),

    listCommentsFromArtist: require('./list-comments-from-artist'),

    retrieveTracks: require('./retrieveTracks'),

    retrieveAlbum: require('./retrievesingleAlbum'),

    retrievesingletrack: require('./retrievesingletrack'),

    // TODO other route handlers

    notFound: require('./not-found')
}