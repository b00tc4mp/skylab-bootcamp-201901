const { Schema }  = require ('mongoose')


const Pin = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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

module.exports = { Pin }