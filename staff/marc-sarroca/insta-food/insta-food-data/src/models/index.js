"use strict";
const mongoose = require("mongoose");
const { User, Post, Comment } = require("./schemas");

module.exports = {
  User: mongoose.model("User", User),
  Post: mongoose.model("Post", Post),
  Comment: mongoose.model("Comment", Comment)
};
