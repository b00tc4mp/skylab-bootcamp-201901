"use strict";

const { Schema } = require("mongoose");

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: {
    type: Array,
    required: true
  }
});
module.exports = User;
