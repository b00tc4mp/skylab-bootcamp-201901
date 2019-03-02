const express = require('express');
const bodyParser = require('body-parser');
const { registerUser } = require('../controller/user');

const jsonBodyParser = bodyParser.json();

const router = express.Router();

router.post('/user', jsonBodyParser, registerUser);

module.exports = router;
