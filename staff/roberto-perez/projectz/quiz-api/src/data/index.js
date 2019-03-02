'use strict';

const mongoose = require('mongoose');
const { User } = require('./models/schemas');

module.exports = {
  mongoose,
  models: {
    User: mongoose.model('User', User),
  },
};
