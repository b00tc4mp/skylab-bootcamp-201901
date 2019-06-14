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

    toogleSold: require('./toogle-sold'),

    retrieveFavs: require('./retrieve-favs-from-user'),

    searchProductsByCategory: require('./search-products-by-category'),

    searchProducts: require('./search-products'),

    uploadProductImg: require('./upload-product-img'),

    uploadUserImg: require('./upload-user-img'),

    retrieveUserFromProducts: require('./retrieve-user-from-product'),

    retrieveUserWithId: require('./retrieve-user-with-id'),

    retrieveProductsFromUserId: require('./retrieve-userid-products'),

    createChat: require('./create-chat'),

    sendMessage: require('./send-message'),

    retrieveChats: require('./retrieve-chats'),

    retrieveMessagesFromChat: require('./retrieve-message-from-chatid'),

    saveObject3d: require('./save-object-3d'),

    retrieveObject3d: require('./retrieve-object-3d'),

    notFound: require('./not-found')
}