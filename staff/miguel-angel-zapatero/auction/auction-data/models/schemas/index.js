const { Schema, Schema: { Types: { ObjectId }} } = require('mongoose')

const user = new Schema({
    name: {type: String, required: [true, 'name required'], trim: true},
    surname: {type: String, required: [true, 'surname required'], trim: true},
    email: {
        type: String, 
        required: [true, 'email required'], 
        unique: true,
        trim: true
        //validate: isEmail --> MIRAR SI AL FINAL LO HAGO
    },
    password: {type: String, required: [true, 'password required']},
    // role: {
    //     type: String,
    //     default: 'user',
    //     enum: {
    //         values:['user', 'admin'],
    //         message: 'not valid role'
    //     }
    // },
    // calendar: [{type: ObjectId, ref: 'Auctions'}],
    items: [{type: ObjectId, ref: 'Items'}]
})

const bid = new Schema({
    userId: {type: ObjectId, ref: 'Users', required: true},
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
    bids: [bid]
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

// const auctions = new Schema({
//     title: {type: String, required: [true, 'title required']},
//     overview: {type: String, required: [true, 'overview required']},
//     image: String,
//     type: {
//         type: String, 
//         enum: {values: ['live', 'open'], message: 'type not valid'},
//         required: true
//     },
//     category: {type: ObjectId, ref: 'Categories', required: true},
//     lots: [{type: ObjectId, ref: 'Items'}],
//     startDate: {type: Date, default: Date.now},
//     finishDate: {type: Date, required: [true, 'date required']}
// })

// const categories = new Schema({
//     title: String,
//     description: String
// })

module.exports = {
    user,
    item,
    bid
}