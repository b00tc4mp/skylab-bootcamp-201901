const mongoose = require("mongoose");
const {
    Schema,
    SchemaTypes:{ObjectId}
} = mongoose

const Events  = require('./events')

const Categories = new Schema ({

    name:{
        type: String,
        require : true
    },

    image:{
        type: String,
        require: true,
    }
   
})

module.exports = Categories
