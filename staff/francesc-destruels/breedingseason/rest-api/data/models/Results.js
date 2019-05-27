const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const gameRecord = new Schema({
    player: ObjectId,
    OneEggNestAmount: { type: Number, required: true },
    OneEggNestLvL: { type: Number, required: true },
    TwoEggNestAmount: { type: Number, required: true },
    TwoEggNestLvL: { type: Number, required: true },
    ThreeEggNestAmount: { type: Number, required: true },
    ThreeEggNestLvL: { type: Number, required: true },
    FourEggNestAmount: {type: Number, required: true},
    FourEggNestLvL: {type: Number, required: true},
    ToolsUsed: {type: Number, required: true},
    ToolsPunctuation: {type: Number, required: true},
    SecurityLvL: {type: Number, required: true},
    SecurityPunctuation: {type: Number, required: true},
    FishingRoadUsed: {type: Number, required: true}
})

module.exports = gameRecord