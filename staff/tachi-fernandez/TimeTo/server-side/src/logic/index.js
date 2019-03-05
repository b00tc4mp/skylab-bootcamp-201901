"use strict";
const {
    SchemaTypes:{ObjectId}
} = require("mongoose");
const {
    User,
    Events 
} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {EmptyError} = require('../errors')

/**
 * Abstraction of business logic.
 */
const logic = {
  jwtSecret: null,

  /**
   * Registers a user.
   *
   * @param {string} name
   * @param {string} surname
   * @param {string} email
   * @param {string} password
   * @param {string} passwordConfirmation
   */
  registerUser(name, surname,age,description, email, password, passwordConfirmation) {
    if (typeof name !== "string") throw TypeError(name + " is not a string");

    if (!name.trim().length) throw EmptyError("name cannot be empty");

    if (typeof surname !== "string") throw TypeError(surname + " is not a string");
    
    if (!surname.trim().length) throw Error("surname cannot be empty");

    if (typeof age !== "string") throw TypeError(age + " is not a string");

    if (!age.trim().length) throw Error("age cannot be empty");

    if (typeof description !== "string") throw TypeError(description + " is not a string1");

    if (!description.trim().length) throw Error("description cannot be empty");
    
    if (typeof email !== "string") throw TypeError(email + " is not a string2");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string3");

    if (!password.trim().length) throw Error("password cannot be empty");

    if (typeof passwordConfirmation !== "string") throw TypeError(passwordConfirmation + " is not a string4");

    if (!passwordConfirmation.trim().length)
      throw Error("password confirmation cannot be empty");

    if (password !== passwordConfirmation)
      throw Error("passwords do not match");

    return (async () => {
      const user = await User.findOne({ email });

      if (user) throw Error(`user with email ${email} already exists`);

      const hash = await bcrypt.hash(password, 10);

      const { id } = await User.create({
        name,
        surname,
        age,
        description,
        email,
        password: hash
      });

      return {status : "OK" , data: {
        id
      }}
    })();
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

    return (async () => {
      const user = await User.findOne({ email });

      if (!user) throw Error(`user with email ${email} not found`);

      const match = await bcrypt.compare(password, user.password);

      if (!match) throw Error("wrong credentials");

      const { id } = user;


      return  id;
    })();
  },

  // __verifyUserToken__(userId, token) {
  //   const { sub } = jwt.verify(token, this.jwtSecret);

  //   if (sub !== userId)
  //     throw Error(`user id ${userId} does not match token user id ${sub}`);
  // },

  retrieveUser(id, token) {
    if (typeof id !== "string") throw TypeError(id + " is not a string");

    if (!id.trim().length) throw Error("id cannot be empty");

    if (typeof token !== "string") throw TypeError(token + " is not a string");

    if (!token.trim().length) throw Error("token cannot be empty");

    this.__verifyUserToken__(id, token);

    return (async () => {
      const user = await User.findById(id);

      if (!user) throw Error(`user with id ${id} not found`);

      delete user.password;

      return user;
    })();
  },

  // updateUser(userId,data) {
    
  //   if (typeof userId !== "string") throw TypeError(userId + " is not a string");

  //   if (!userId.trim().length) throw Error("userId cannot be empty");

  //   if (typeof data !== Object) throw TypeError (data + 'is not an object')
    

  // }

  createEvents( userId, title, description, date , ubication , category) {
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof title !== "string") throw TypeError(title + " is not a string");

    if (!title.trim().length) throw Error("title cannot be empty");

    if (typeof description !== "string") throw TypeError(description + " is not a string");

    if (!description.trim().length) throw Error("description cannot be empty");

    if (typeof date !== "string") throw TypeError(date + " is not a string");

    if (!date.trim().length) throw Error("date cannot be empty");

    if (typeof ubication !== "string") throw TypeError(ubication + " is not a string");

    if (!ubication.trim().length) throw Error("ubication cannot be empty");

    if (typeof category !== "string") throw TypeError(category + " is not a string");

    if (!category.trim().length) throw Error("category cannot be empty");


    debugger
    
    return (async () => {
      const user = await User.findById(userId);

      if (!user) throw Error(`user with id ${userId} not found`);
      debugger
      delete user.password;

      const userEvent = await Events.create({

        user: userId,
        title,
        description,
        date,
        ubication,
        category

      });

      let enventId = userEvent._id
      
      //return  userEvent
      
      return {status : "OK" , data: {
        enventId 
      }}

    })();

  }

};

module.exports = logic;
