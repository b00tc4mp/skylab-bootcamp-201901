'use strict';

const { AnswerGame } = require('./models/answer-game.model');
const { Answer } = require('./models/answer.model');
const { Question } = require('./models/question.model');
const { Quiz } = require('./models/quiz.model');
const { Game } = require('./models/game.model');
const { User } = require('./models/user.model');

module.exports = {
    mongoose: require('mongoose'),
    AnswerGame,
    Answer,
    Question,
    Quiz,
    Game,
    User
}
