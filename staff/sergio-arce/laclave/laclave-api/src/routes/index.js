module.exports = {
    //user
    registerUser: require('./user/register'),
    loginUser: require('./user/login'),
    retrieveUser: require('./user/retrieve'),
    updateUser: require('./user/update'),
    deleteUser: require('./user/delete'),
    //congress
    createCongress: require('./congress/create'),
    retrieveCongress: require('./congress/retrieve'),
    updateCongress: require('./congress/update'),
    deleteCongress: require('./congress/delete'),
    listCongresses: require('./congress/list'),
    searchCongresses: require('./congress/search'),

    //artist
    listArtists: require('./artist/list'),
    
    retrieveArtist: require('./artist/retrieve'),

    createArtist: require('./artist/create'),

    searchArtists: require('./artist/search'),

    searchItems: require('./search/search')
    
}   