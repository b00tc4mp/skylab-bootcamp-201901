"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const tokenHelper = require("../token-helper");

const {
  SchemaTypes: { ObjectId },
  Schema
} = mongoose;

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
  }
});

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
  }
});

const models = {
  User: mongoose.model("User", User),
  Post: mongoose.model("Post", Post)
};

const logic = {
  /**
   * Registers a user.
   *
   * @param {string} name
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @param {string} passwordConfirmation
   */
  registerUser(name, username, email, password, passwordConfirmation) {
    if (typeof name !== "string") throw TypeError(name + " is not a string");
    if (!name.trim().length) throw Error("name cannot be empty");
    if (typeof username !== "string")
      throw TypeError(username + " is not a string");
    if (!username.trim().length) throw Error("username cannot be empty");
    if (typeof email !== "string") throw TypeError(email + " is not a string");
    if (!email.trim().length) throw Error("email cannot be empty");
    if (typeof password !== "string")
      throw TypeError(password + " is not a string");
    if (!password.trim().length) throw Error("password cannot be empty");
    if (typeof passwordConfirmation !== "string")
      throw TypeError(passwordConfirmation + " is not a string");
    if (!passwordConfirmation.trim().length)
      throw Error("password confirmation cannot be empty");
    if (password !== passwordConfirmation)
      throw Error("passwords do not match");

    const { User } = models;
    return User.findOne({ email })
      .then(user => {
        if (user) throw Error(`user with email ${email} already exists`);
      })
      .then(() => User.findOne({ username }))
      .then(user => {
        if (user) throw Error(`user with email ${username} already exists`);
        return bcrypt.hash(password, 10);
      })
      .then(hash => User.create({ name, username, email, password: hash }));
  },

  /**
   * Authenticates user by its credentials.
   *
   * @param {string} email
   * @param {string} password
   */
  authenticateUser(email, password) {
    if (typeof email !== "string") throw TypeError(email + " is not a string");
    if (!email.trim().length) throw Error("email cannot be empty");
    if (typeof password !== "string")
      throw TypeError(password + " is not a string");
    if (!password.trim().length) throw Error("password cannot be empty");

    const { User } = models;

    return User.findOne({ email: email }).then(user => {
      if (!user) throw Error(`user with email ${email} not found`);

      return bcrypt.compare(password, user.password).then(match => {
        if (!match) throw Error("wrong credentials");

        const { id } = user;
        const token = tokenHelper.createToken(id);

        //const token = jwt.sign({ sub: id }, this.jwtSecret, {
        //expiresIn: "4h"
        //});

        return { id, token };
      });
    });
  },

  // __verifyUserToken__(userId, token) {
  //   const { sub } = jwt.verify(token, this.jwtSecret);

  //   if (sub !== userId)
  //     throw Error(`user id ${userId} does not match token user id ${sub}`);
  // },

  retrieveUser(userId) {
    // TODO validate userId and token type and content
    const { User } = models;

    return User.findOne({ _id: userId }).then(user => {
      if (!user) throw Error(`user with id ${id} not found`);

      delete user.password;

      return user;
    });
  },

  createPost(tags, title, description, image, comments, user_id) {
    if (typeof title !== "string") throw TypeError(title + " is not a string");
    if (!title.trim().length) throw Error("name cannot be empty");
    if (typeof description !== "string")
      throw TypeError(description + " is not a string");
    if (!description.trim().length) throw Error("description cannot be empty");
    if (!comments instanceof Array) throw TypeError(title + " is not a array");
    if (typeof image !== "string") throw TypeError(title + " is not a string");
    if (!comments instanceof Array) throw TypeError(title + " is not a array");
    if (typeof user_id !== "string")
      throw TypeError(title + " is not a string");
    const { Post } = models;
    return Post.create({ tags, title, description, image, comments, user_id });
  }
};

module.exports = logic;
