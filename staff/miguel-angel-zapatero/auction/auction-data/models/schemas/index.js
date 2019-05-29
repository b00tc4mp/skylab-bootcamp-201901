const { Schema, Schema: { Types: { ObjectId }} } = require('mongoose')

const user = new Schema({
    name: {type: String, required: [true, 'name required'], trim: true},
    surname: {type: String, required: [true, 'surname required'], trim: true},
    email: {
        type: String, 
        required: [true, 'email required'], 
        unique: true,
        trim: true
    },
    password: {type: String, required: [true, 'password required']},
    items: [{type: ObjectId, ref: 'Item'}]
})

const bid = new Schema({
    userId: {type: ObjectId, ref: 'User', required: true},
    amount: {type: Number, required: [true, 'ammount required']},
    timeStamp: {type: Date, default: Date.now}
})

const item = new Schema({
    title: {type: String, required: [true, 'title required'], trim: true},
    description: {type: String, required: [true, 'description required'], trim: true},
    startPrice: {type: Number, required: [true, 'start price required'], trim: true},
    startDate: {type: Date, required: [true, 'start date required']},
    finishDate: {type: Date, required: [true, 'finish date required']},
    reservedPrice: {type: Number},
    // bids: [{type: ObjectId, ref: 'Bid'}],
    bids: [bid],
    images: [{type: String, trim: true}],
    category: {type: String, required: [true, 'category required'], trim: true},
    city: {type: String, required: [true, 'city required'], trim: true}
})

item.methods.isReserved = function() {
    return this.reservedPrice ? true : false
}

item.methods.isClosed = function() {
    return Date.now() > this.finishDate
}

item.methods.winningBid = function() {
    this.bids.sort(function (a, b) {
        return b.amount - a.amount;
      });

    return this.bids[0]
}

module.exports = {
    user,
    item,
    bid
}