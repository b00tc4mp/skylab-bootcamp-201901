"use strict";

const bcrypt = require("bcrypt");
const tokenHelper = require("../token-helper");
const {
  models: { User, Post }
} = require("insta-food-data");

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

    return User.findOne({ email: email }).then(user => {
      if (!user) throw Error(`user with email ${email} not found`);

      return bcrypt.compare(password, user.password).then(match => {
        if (!match) throw Error("wrong credentials");

        const { id } = user;
        const token = tokenHelper.createToken(id);

        return { id, token };
      });
    });
  },

  retrieveUser(userId) {
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

    return Post.create({ tags, title, description, image, comments, user_id });
  },

  retrievePostsByUser(userId) {
    if (typeof userId !== "string")
      throw TypeError(userId + " is not a string");
    return User.findOne({ _id: userId })
      .then(user => {
        if (!user) throw Error(`user with id ${id} not found`);
      })
      .then(() =>
        Post.find({ user_id: userId })
          .select("-__v")
          .lean()
      )
      .then(post => post);
  },

  retrieveAllPosts(userId) {
    if (typeof userId !== "string")
      throw TypeError(userId + " is not a string");
    return Post.find({})
      .select("-__v")
      .lean()

      .then(post => post);
  },

  toggleFavoritesUser(userId, postId) {
    if (typeof userId !== "string")
      throw TypeError(userId + " is not a string");
    if (typeof postId !== "string")
      throw TypeError(postId + " is not a string");
    return User.findById(userId).then(user => {
      const { favorites = [] } = user;
      const index = favorites.findIndex(_postId => _postId === postId);
      if (index < 0) favorites.push(postId);
      else favorites.splice(index, 1);
      user.favorites = favorites;
      return user.save();
    });
  },

  addCommentPost(userId, postId, text) {
    return Post.findById(postId).then(post => {
      const { comments = [] } = post;
      comments.push({ userId, text });

      return post.save();
    });
  }
};

module.exports = logic;
