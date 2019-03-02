const { Schema } = require('mongoose');

const User = new Schema({
  name: {
    type: String,
    required: true,
  },

  surname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: email => {
        return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(
          email,
        );
      },
      message: props => `${props.value} is not a valid email`,
    },
  },

  password: {
    type: String,
    required: true,
  },

  favoriteQuizzes: [String],

  totalGames: {
    type: Number,
    default: 0,
  },

  totalPoints: {
    type: Number,
    default: 0,
  },

  totalCorrect: {
    type: Number,
    default: 0,
  },

  totalIncorrect: {
    type: Number,
    default: 0,
  },

  totalFirstPosition: {
    type: Number,
    default: 0,
  },
});

module.exports = User;
