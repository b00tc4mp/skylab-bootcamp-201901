let mongoose = require('mongoose');
let { user, item } = require('./schemas');



module.exports = {
    User: mongoose.model('User', user),
    Item: mongoose.model('Item', item),
   //alex consejo  mongoose: require("mongoose")
}