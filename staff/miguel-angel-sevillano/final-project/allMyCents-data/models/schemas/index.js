const { Schema } = require('mongoose')
const { isEmail } = require('validator')



const ticketItem = new Schema({
    name:{type:String},
    Euro:{type:Number}

})

const ticket = new Schema({
    items: [ticketItem],
    date: { type:String ,default:new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')},
    month:{ type:String ,default:new Date().toISOString().replace('-', '/').slice(0,7)},
    
})

const item = new Schema({
    text: { type: String, required: true },
})


const cat = new Schema({
    category:{type:String},
    items:{type:Array}
})

const alert =new Schema({
    name: {type:String ,required :true},
    Euro: {type: Number,required:false},
    maxValue:{type:Number,required:true}
    
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
    age: Number,
    tickets: [ticket],
    alerts:[alert]
})




module.exports = { user, item, ticket , alert,ticketItem ,cat}