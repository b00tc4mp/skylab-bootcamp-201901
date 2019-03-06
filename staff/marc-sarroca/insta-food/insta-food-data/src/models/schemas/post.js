"use strict";

const { Schema } = require("mongoose");

const Post = new Schema({
  tags: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  comments: {
    type: Array
  }
});

module.exports = Post;
