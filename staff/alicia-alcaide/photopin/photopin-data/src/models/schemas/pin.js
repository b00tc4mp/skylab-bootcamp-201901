const { Schema } = require('mongoose')


const pin = new Schema({
    mapId: { type: Schema.Types.ObjectId, ref: 'PMap', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    urlImage: { type: String },
    icon: { type: String },
    color: { type: String },
    tags: [{ type: String }],
    bestTimeOfYear: { type: String },
    bestTimeOfDay: { type: String },
    photographyTips: { type: String },
    travelInformation: { type: String },
    coordinates: {
        latitude: { type: Number },
        longitude: { type: Number }
    }
})

module.exports = pin