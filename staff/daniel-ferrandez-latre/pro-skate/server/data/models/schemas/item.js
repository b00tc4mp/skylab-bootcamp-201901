const  { Schema } = require('mongoose')



const item = new Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    tag: []
})


module.exports =  item 