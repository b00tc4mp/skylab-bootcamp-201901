'use strict';

const {
  models: { User },
} = require('../data');
const bcrypt = require('bcrypt');
const { EmptyError, DuplicateError } = require('../errors');

/**
 * Abstraction of business logic.
 */
const logic = {
  /**
   *
   * @param {String} name
   * @param {String} surname
   * @param {String} email
   * @param {String} password
   *
   * @throws {TypeError} on non-string name, surname, username or password
   * @throws {ValueError} on empty or blank name, surname, username or password
   * @throws {AlreadyExistsError} on already registered username
   *
   * @returns {Promise} resolves on correct data rejects on wrong data
   */
  registerUser(name, surname, email, password) {
    if (typeof name !== 'string') throw TypeError(name + ' is not a string');

    if (!name.trim().length) throw new EmptyError('name cannot be empty');

    if (typeof surname !== 'string')
      throw TypeError(surname + ' is not a string');

    if (!surname.trim().length) throw new EmptyError('surname cannot be empty');

    if (typeof email !== 'string') throw TypeError(email + ' is not a string');

    if (!email.trim().length) throw new EmptyError('email cannot be empty');

    if (typeof password !== 'string')
      throw TypeError(password + ' is not a string');

    if (!password.trim().length)
      throw new EmptyError('password cannot be empty');

    return (async () => {
      const user = await User.findOne({ email });

      if (user)
        throw new DuplicateError(`User with email ${email} already exists`);

      const hash = await bcrypt.hash(password, 10);

      const { id } = await User.create({
        name,
        surname,
        email,
        password: hash,
      });

      return id;
    })();
  },
};

module.exports = logic;
