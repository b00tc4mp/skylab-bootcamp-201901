const express = require('express');
const authRoutes = require('./auth.route');
const quizRoutes = require('./quiz.route');
const questionRoutes = require('./question.route');
const gameRoutes = require('./game.route');
const joinRoutes = require('./join.route');
const imageRoutes = require('./image.route');

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/quiz', quizRoutes);

router.use('/quiz/:quizId/question', questionRoutes);

router.use('/image', imageRoutes);

router.use('/game', gameRoutes);

router.use('/join', joinRoutes);

module.exports = router;    