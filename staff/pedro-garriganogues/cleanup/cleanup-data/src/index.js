const mongoose = require('mongoose')
const Product = require('./model/schemas/product')
const User = require('./model/schemas/user')


module.exports = {
    mongoose,
    models: {
        Product: mongoose.model('Product', Product),
        User: mongoose.model('User', User),
    }
}


                        // module.exports = {
                        //     Product: mongoose.model('Product', Product),
                        //     User: mongoose.model('User', User),
                        // }