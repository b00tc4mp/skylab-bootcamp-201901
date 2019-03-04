"use strict";

const { Player, Match, Team } = require("../models");
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
    if (!name.trim().length) throw Error("name cannot be empty");

    if (typeof surname !== "string")
      throw TypeError(`${surname} is not string`);
    if (!surname.trim().length) throw Error("surname cannot be empty");

    if (typeof email !== "string") throw TypeError(`${email} is not string`);
    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(`${password} is not string`);
    if (!password.trim().length) throw Error("password cannot be empty");

    return (async () => {
      const player = await Player.findOne({email});

      if (player) {
        throw Error(`player wiith email ${player.email} already exists`);
      }

      const hash = await bcrypt.hash(password, 10);
   
      const { id } = await Player.create({ name, surname, email, password: hash })
      //a player le anyado un campo que es id
      return id;
    })();
  },

      /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticatePlayer(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return (async () => {
            debugger
                const player = await Player.findOne({ email })
                console.log(player)
                
                if (!player) throw Error(`player with email ${email} not found`)
                
                const match = await bcrypt.compare(password, player.password)
                
                if (!match) throw Error('wrong credentials')
                
                return player.id
        })()
    },
};

module.exports = logic;