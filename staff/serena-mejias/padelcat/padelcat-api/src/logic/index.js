"use strict";

const { User, Comment } = require("../models");
const bcrypt = require("bcrypt");

const logic = {
  /**
   *
   * Register a new user
   *
   * @param {string} name
   * @param {string} surname
   * @param {string} username
   * @param {string} password
   *
   * @throws {TypeError} - When any param is not a string.
   * @throws {Error} - When any param is empty.
   * @throws {Error} - When API returns an error.
   *
   * @returns {Object} - User Id.
   *
   */

  registerPlayer(name, surname, email, password) {
    if (typeof name !== "string") throw TypeError(`${name} is not string`);
    if (!name.trim().length) throw Error("name is empty");

    if (typeof surname !== "string")
      throw TypeError(`${surname} is not string`);
    if (!surname.trim().length) throw Error("surname is empty");

    if (typeof email !== "string") throw TypeError(`${email} is not string`);
    if (!email.trim().length) throw Error("email is empty");

    if (typeof password !== "string")
      throw TypeError(`${password} is not string`);
    if (!password.trim().length) throw Error("password is empty");

    return (async () => {
      const player = await Player.findOne(player.email);

      if (player) {
        throw Error(`player wiith email ${player.email} already exists`);
      }

      const hash = await bcrypt.hash(password, 10);

      const playerId = await Player.create({
        name,
        surname,
        email,
        password: hash
      }).id;
      //a player le anyado un campo que es id

      return playerId;
    })();
  }
};
