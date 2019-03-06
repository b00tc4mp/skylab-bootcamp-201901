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

  age: {
    type: String,
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

});

module.exports = User;
