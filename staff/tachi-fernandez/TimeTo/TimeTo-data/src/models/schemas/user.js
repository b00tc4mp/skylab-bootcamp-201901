// const {
//   Schema
// } = require("mongoose");

const mongoose = require("mongoose");

const {
  Schema,
  SchemaTypes:{ObjectId}
} = mongoose

const Events  = require('./events')

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },

  userName:{
    type: String,
    required: true,
    unique: true
  },

  age: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: email => {
        return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(
          email
        );
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true
  },

  events: [{
    type: ObjectId,
    ref: 'Events'
}],

  image:{
    type: String,
    required:true,
    default:"https://res.cloudinary.com/dj6yymmpj/image/upload/v1552478235/avatar.png"
  }

});

module.exports = User;
