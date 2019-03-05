const { Schema, ObjectId } = require('mongoose')

const User = new Schema({
       
    
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: email => {
                return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        }
    },

    password: {
        type: String,
        required: true
    },

    myHouses: [{

        type: String

    }],
    // myHouses: [{

    //     type: ObjectId,
    //     ref: 'House'

    // }],
    
    

    // favorites:[{

    //     type: ObjectId,
    //     ref: 'House'

    // }]    
})

module.exports = User