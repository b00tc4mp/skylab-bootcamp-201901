//@ts-check
import validate from '../../common/validate';
import { ConnectionError, TimeoutError } from '../../common/errors';

const restApi = {
  __url__: 'http://localhost:8000/api',
  __timeout__: 0,

  createUser(name, surname, email, password) {
    validate.arguments([
      { name: 'name', value: name, type: 'string', notEmpty: true },
      { name: 'surname', value: surname, type: 'string', notEmpty: true },
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true },
    ]);

    return fetch(`${this.__url__}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, surname, email, password }),
    })
      .then(res => {
        return res.json();
      })
      .catch(error => {
        if (error instanceof TypeError) throw new ConnectionError('cannot connect');
        else if (error instanceof DOMException)
          throw new TimeoutError(`time out, exceeded limit of ${this.__timeout__}ms`);
        else throw error;
      });
  },

  loginUser(email, password) {
    validate.arguments([
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true },
    ]);

    return fetch(`${this.__url__}/users/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .catch(error => {
        if (error instanceof TypeError) throw new ConnectionError('cannot connect');
        else if (error instanceof DOMException)
          throw new TimeoutError(`time out, exceeded limit of ${this.__timeout__}ms`);
        else throw error;
      });
  },

  retrieveUser(token) {
    validate.arguments([{ name: 'token', value: token, type: 'string', notEmpty: true }]);

    return fetch(`${this.__url__}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .catch(error => {
        if (error instanceof TypeError) throw new ConnectionError('cannot connect');
        else if (error instanceof DOMException)
          throw new TimeoutError(`time out, exceeded limit of ${this.__timeout__}ms`);
        else throw error;
      });
  },

  retrieveCart(token) {
    validate.arguments([{ name: 'token', value: token, type: 'string', notEmpty: true }]);

    return fetch(`${this.__url__}/users/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .catch(error => {
        if (error instanceof TypeError) throw new ConnectionError('cannot connect');
        else if (error instanceof DOMException)
          throw new TimeoutError(`time out, exceeded limit of ${this.__timeout__}ms`);
        else throw error;
      });
  },

  /**
   *
   * @param {string} userId
   * @param {string} token
   * @param {Object} fields
   * @param {Function} callback
   */
  updateUser(token, name, surname, email, password) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true },
      { name: 'name', value: name, type: 'string', optional: true },
      { name: 'surname', value: surname, type: 'string', optional: true },
      { name: 'email', value: email, type: 'string', optional: true },
      { name: 'password', value: password, type: 'string', optional: true },
    ]);

    let data = {};
    if (name) data = { name };
    if (surname) data = { ...data, surname };
    if (email) data = { ...data, email };
    if (password) data = { ...data, password };

    return fetch(`${this.__url__}/users/`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },

  searchDucks(token, query) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true },
      { name: 'query', value: query, type: 'string' },
    ]);

    return fetch(`${this.__url__}/ducks?query=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .catch(error => {
        if (error instanceof TypeError) throw new ConnectionError('cannot connect');
        else if (error instanceof DOMException)
          throw new TimeoutError(`time out, exceeded limit of ${this.__timeout__}ms`);
        else throw error;
      });
  },

  retrieveDuck(token, id) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true },
      { name: 'id', value: id, type: 'string' },
    ]);

    const controller = new AbortController();
    let signal;
    if (this.__timeout__) {
      signal = controller.signal;
      const timeout = setTimeout(() => controller.abort(), this.__timeout__);
    }

    return fetch(`${this.__url__}/ducks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    })
      .then(res => res.json())
      .catch(error => {
        if (error instanceof TypeError) throw new ConnectionError('cannot connect');
        else if (error instanceof DOMException)
          throw new TimeoutError(`time out, exceeded limit of ${this.__timeout__}ms`);
        else throw error;
      });
  },

  toggleDuck(token, id) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true },
      { name: 'id', value: id, type: 'string' },
    ]);

    const controller = new AbortController();
    let signal;
    if (this.__timeout__) {
      signal = controller.signal;
      const timeout = setTimeout(() => controller.abort(), this.__timeout__);
    }

    return fetch(`${this.__url__}/ducks/${id}/fav`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      signal,
    })
      .then(res => res.json())
  },

  retrieveFavDucks(token) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true },
    ]);

    const controller = new AbortController();
    let signal;
    if (this.__timeout__) {
      signal = controller.signal;
      const timeout = setTimeout(() => controller.abort(), this.__timeout__);
    }

    return fetch(`${this.__url__}/ducks/fav`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    })
      .then(res => res.json())
  },
};

export default restApi;
