"use strict";

const { Schema } = require("mongoose");
const {
  Types: { ObjectId }
} = Schema;

const Comments = new Schema({
  body: {
    type: String,
    required: true
  },
  by: {
    type: ObjectId,
    ref: "User"
  }
});

module.exports = Comments;
