"use strict";

const { Schema } = require("mongoose");
const {
  Types: { ObjectId }
} = Schema;

const Comment = require("./comment");
const mongoosePaginate = require("mongoose-paginate");
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
    type: ObjectId,
    ref: "User"
  },
  comments: [Comment],

  countfavs: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});
Post.plugin(mongoosePaginate);
module.exports = Post;
