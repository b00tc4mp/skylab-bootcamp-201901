module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    updateUser: require('./update-user'),

    addProduct: require('./create-product'),

    retrieveProducts: require('./retrieve-products'),

    retrieveProduct: require('./retrieve-product'),

    retrieveUserProducts: require('./retrieve-user-products'),

    updateProduct: require('./update-product'),

    toogleFav: require('./toogleFav'),

    retrieveFavs: require('./retrieve-favs-from-user'),

    searchProductsByCategory: require('./search-products-by-category'),

    searchProducts: require('./search-products'),

    notFound: require('./not-found')
}