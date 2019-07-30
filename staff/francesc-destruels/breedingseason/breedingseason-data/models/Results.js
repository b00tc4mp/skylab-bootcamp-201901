const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const result = new Schema({
    player: ObjectId,
    missionCards: {type: Array, required: true},
    OneEggNestAmount: { type: Number, required: true },
    OneEggNestLvL: { type: Number, required: true },
    TwoEggNestAmount: { type: Number, required: true },
    TwoEggNestLvL: { type: Number, required: true },
    ThreeEggNestAmount: { type: Number, required: true },
    ThreeEggNestLvL: { type: Number, required: true },
    FourEggNestAmount: {type: Number, required: true},
    FourEggNestLvL: {type: Number, required: true},
    ToolsUsed: {type: Number, required: true},
    ToolsPuntuation: {type: Number, required: true},
    SecurityLvL: {type: Object, required: true},
    SecurityPuntuation: {type: Number, required: true},
    StrikeLvL: {type: Number, required: true},
    puntuation: {type: Number, required: true}
})

module.exports = result