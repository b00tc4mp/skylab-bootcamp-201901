module.exports = {
    
    //user
    registerUser: require('./user/register'),
    loginUser: require('./user/login'),
    retrieveUser: require('./user/retrieve'),
    updateUser: require('./user/update'),
    deleteUser: require('./user/delete'),

    favArtist: require('./fav/artist'),

    //congress
    createCongress: require('./congress/create'),
    retrieveCongress: require('./congress/retrieve'),
    updateCongress: require('./congress/update'),
    deleteCongress: require('./congress/delete'),
    listCongresses: require('./congress/list'),
    searchCongresses: require('./congress/search'),

    //artist
    createArtist: require('./artist/create'),
    retrieveArtist: require('./artist/retrieve'),
    listArtists: require('./artist/list'),
    searchArtists: require('./artist/search'),

    // search Items mix congress and artist
    searchItems: require('./search/search')

    
  
    
}   