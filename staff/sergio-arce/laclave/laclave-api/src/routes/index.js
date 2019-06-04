
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
    listCongress: require('./congress/list'),
    deleteCongress: require('./congress/delete'),

    // artist
    createArtist: require('./artist/create')
    

}