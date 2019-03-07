"use strict";

const { Schema } = require("mongoose");
const {
  Types: { ObjectId }
} = Schema;

const Comment = require("./comment");
const Post = new Schema({
  tags: {
    type: Array,
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
  // postedBy: {
  //   type: ObjectId,
  //   ref: "User"
  comments: [Comment]
});

module.exports = Post;
