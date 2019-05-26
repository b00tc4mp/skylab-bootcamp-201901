const { Schema, Schema: { Types: { ObjectId }} } = require('mongoose')

const users = new Schema({
    name: {type: String, required: [true, 'name required']},
    surname: {type: String, required: [true, 'surname required']},
    email: {
        type: String, 
        required: [true, 'email required'], 
        unique: true,
        //validate: isEmail --> MIRAR SI AL FINAL LO HAGO
    },
    password: {type: String, required: [true, 'password required']},
    calendar: [{type: ObjectId, ref: 'Auctions'}],
    bids: [{type: ObjectId, ref: 'Items'}]
})

const bids = new Schema({
    user: {type: ObjectId, ref: 'User'},
    ammount: Number,
    timeStamp: {type: Date, default: Date.now}
})

const items = new Schema({
    title: {type: String, required: [true, 'title required']},
    description: {type: String, required: [true, 'description required']},
    startPrice: {type: Number, required: [true, 'start price required']},
    currentBid: {type: ObjectId, ref: 'Bids'},
    winningBid: {type: ObjectId, ref: 'Bids'}, 
    bids: [bid],
    startDate: {type: Date, required: [true, 'start date required']},
    finishDate: {type: Date, required: [true, 'finish date required']},
    reservedPrice: {type: Number},
    reserved: {
        type: Boolean,
        default: function() {
            //MIRAR DE PONER TRUE/FALSE CUANDO PONGA RESERVED PRICE
            this.reservedPrice ? true : false
        }
    },
    closed: {
        type: Boolean,
        default: function() {
            //QUE SE PONGA TRUE/FALSE DEPENDIENDO DE SI FINISH DATE
            return Date.now === this.finishDate
        }
    }
})

const auctions = new Schema({
    title: {type: String, required: [true, 'title required']},
    overview: {type: String, required: [true, 'overview required']},
    image: String,
    type: {
        type: String, 
        enum: {values: ['live', 'open'], message: 'type not valid'},
        required: true
    },
    category: {type: ObjectId, ref: 'Categories'},
    lots: [{type: ObjectId, ref: 'Items'}],
    startDate: {type: Date, default: Date.now},
    finishDate: {type: Date, required: [true, 'date required']}
})

const categories = new Schema({
    title: String,
    description: String
})

module.exports = {
    users,
    items,
    auctions,
    categories,
    bids
}