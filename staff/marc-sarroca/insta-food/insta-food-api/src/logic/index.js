"use strict";

const bcrypt = require("bcrypt");
const tokenHelper = require("../token-helper");
const {
  models: { User, Post, Comment }
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
        if (user) throw Error(`user with username ${username} already exists`);
        return bcrypt.hash(password, 10);
      })
      .then(hash =>
        User.create({ name, username, email, password: hash }).then(
          user => user._id
        )
      );
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
    if (typeof userId !== "string")
      throw TypeError(userId + " is not a string");
    if (!userId.trim().length) throw Error("userId cannot be empty");
    return User.findById(userId)
      .populate("favorites")
      .select("-__v -password")
      .then(user => {
        if (!user) throw Error(`user with id ${userId} not found`);

        delete user.password;

        return user;
      });
  },

  createPost(title, description, image, user_id) {
    if (typeof title !== "string") throw TypeError(title + " is not a string");
    if (!title.trim().length) throw Error("title cannot be empty");
    if (typeof description !== "string")
      throw TypeError(description + " is not a string");
    if (!description.trim().length) throw Error("description cannot be empty");
    if (typeof image !== "string") throw TypeError(image + " is not a string");
    if (!image.trim().length) throw Error("image cannot be empty");
    if (typeof user_id !== "string")
      throw TypeError(user_id + " is not a string");
    if (!user_id.trim().length) throw Error(" user_id cannot be empty");

    let t = description.split(" ").filter(w => w.includes("#"));

    return Post.create({
      tags: t,
      title,
      description,
      image,
      user_id
    });
  },

  retrievePostsByUser(userId) {
    const res = {};
    if (typeof userId !== "string")
      throw TypeError(userId + " is not a string");
    if (!userId.trim().length) throw Error("userId cannot be empty");
    return User.findOne({ _id: userId })
      .select("-__v -password")
      .then(user => {
        if (!user) throw Error(`user with id ${id} not found`);
        res.user = user;
      })
      .then(() =>
        Post.find({ user_id: userId })
          .sort([["date", -1]])
          .populate("comments.by", "username")
          .select("-__v")
          .lean()
      )
      .then(post => {
        res.post = post;

        return res;
      });
  },

  retrieveAllPosts(page) {
    return Post.paginate(
      {},
      {
        page,
        limit: 10,
        populate: ["comments.by", "username", "user_id"],
        select: "-__v -password",
        lean: true,
        sort: {
          date: -1
        }
      }
    );
  },

  toggleFavoritesUser(userId, postId) {
    if (typeof userId !== "string")
      throw TypeError(userId + " is not a string");
    if (typeof postId !== "string")
      throw TypeError(postId + " is not a string");
    if (!userId.trim().length) throw Error("userId cannot be empty");
    if (!postId.trim().length) throw Error("postId cannot be empty");
    let _index;

    return User.findById(userId)
      .then(user => {
        if (!user) throw Error(`user with id ${userId} not found`);
        const { favorites = [] } = user;
        const index = favorites.findIndex(
          _postId => _postId.toString() === postId
        );
        _index = index;
        if (index < 0) {
          favorites.push(postId);
        } else favorites.splice(index, 1);
        user.save();
      })
      .then(() => Post.findById(postId))
      .then(post => {
        if (!post) throw Error(`post with id ${postId} not found`);
        if (_index < 0) {
          post.countfavs = post.countfavs + 1;
        } else post.countfavs = post.countfavs - 1;
        post.save();
      })
      .then(() => {
        return User.findById(userId)
          .populate("favorites")
          .select("-__v -password");
      });
  },

  addCommentPost(userId, postId, text) {
    if (typeof userId !== "string")
      throw TypeError(userId + " is not a string");
    if (typeof postId !== "string")
      throw TypeError(postId + " is not a string");
    if (typeof text !== "string") throw TypeError(text + " is not a string");
    if (!text.trim().length) throw Error("text cannot be empty");
    if (!userId.trim().length) throw Error("userId cannot be empty");
    if (!postId.trim().length) throw Error("postId cannot be empty");
    const newComment = new Comment({
      by: userId,
      body: text
    });
    return Post.findById(postId)
      .then(post => {
        if (!post) throw Error(`post with id ${postId} not found`);
        const { comments = [] } = post;
        comments.push(newComment);
        return post.save();
      })
      .then(() => Post.findById(postId).populate("comments.by", "username"));
  },

  deletePost(userId, postId) {
    if (typeof userId !== "string")
      throw TypeError(userId + " is not a string");
    if (typeof postId !== "string")
      throw TypeError(postId + " is not a string");
    if (!postId.trim().length) throw Error("postId cannot be empty");
    if (!userId.trim().length) throw Error("userId cannot be empty");
    return Post.find({ _id: postId, user_id: userId })
      .remove()
      .then(() => {
        return { message: "ok" };
      });
  }
};

module.exports = logic;
