const { Schema } = require('mongoose')
const { isEmail } = require('validator')


const point = new Schema({
    title: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    color: { type: String, required: true }
})

const track = new Schema({
    serialNumber: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    speed: { type: String, required: true },
    status: { type: String},
    date: { type: Date, default: Date.now }
})

const tracker = new Schema({
    serialNumber: { type: String, required: true },
    licensePlate: { type: String },
    tracks: [track]
})

const user = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: isEmail
    },
    password: { type: String, required: true },
    pois: [point],
    trackers: [tracker]
})


module.exports = { user, point, tracker, track }