const { Schema, Schema: { Types: { ObjectId }} }  = require ('mongoose')


const pin = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    author: { type: ObjectId, ref: 'User' },
    urlImage: { type: String },
    icon: { type: String },
    color: { type: String },
    tags: [{ type: String}],
    bestTimeOfYear: { type: String },
    bestTimeOfDay: { type: String },
    photographyTips: { type: String },
    travelInformation: { type: String },
    coordinates: { 
        latitude : { type: Number } , 
        longitude : { type: Number }
    }
})

module.exports = { pin }