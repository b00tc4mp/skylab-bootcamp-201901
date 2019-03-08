"use strict";

module.exports = {
  mongoose: require("mongoose"),
  models: {
    User: require('./models/user.model'),
    Quiz: require('./models/quiz.model'),
    Question: require('./models/question.model'),
    Answer: require('./models/answer.model')
  }
};
