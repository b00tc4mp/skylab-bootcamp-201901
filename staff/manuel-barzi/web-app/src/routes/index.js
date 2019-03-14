module.exports = {
    landing: {
        get: require('./landing/get')
    },

    register: {
        get: require('./register/get'),
        post: require('./register/post')
    },

    login: {
        get: require('./login/get'),
        post: require('./login/post')
    },

    home: {
        get: require('./home/get')
    },

    logout: {
        post: require('./logout/post')
    },

    notFound: {
        get: require('./not-found/get')
    }
}