const { Schema }  = require ('mongoose')
const { Types: { ObjectId }} = Schema

const user = new Schema({
    name: { type: String, required: [true, 'name required'] },
    surname: { type: String, required: [true, 'surname required'] },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        validate: {
            validator: email => {
                return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: { type: String, required: [true, 'password required'] },
    avatar: { type: String },
    language: { type: String,  default: 'EN' },
    favoritePublicMap: [{ type: ObjectId, ref: 'PMap' }]    
})

module.exports = user