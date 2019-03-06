const express = require('express');
const authRoutes = require('./auth.route');
const quizRoutes = require('./quiz.route');
const questionRoutes = require('./question.route');

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/quiz', quizRoutes);

router.use('/quiz/:quizId/question', questionRoutes);

module.exports = router;    