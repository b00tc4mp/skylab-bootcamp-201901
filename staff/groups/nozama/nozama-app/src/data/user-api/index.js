import validate from '../../common/validate';
import { ValueError, ApiError } from '../../common/errors';

const userApi = {
  __url__: 'https://skylabcoders.herokuapp.com/api',
  __app__: 'nozama',

  create(username, password, data = {}) {
    validate.arguments([
      { name: 'username', value: username, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true },
      { name: 'data', value: data, type: 'object' },
    ]);
    const { __app__: app } = this;
    return fetch(`${this.__url__}/user`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        ...data,
        app,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
  },

  auth(username, password) {
    validate.arguments([
      { name: 'username', value: username, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true },
    ]);

    return fetch(`${this.__url__}/auth`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
  },

  retrieve(id, token) {
    validate.arguments([
      { name: 'id', value: id, type: 'string', notEmpty: true },
      { name: 'token', value: token, type: 'string', notEmpty: true },
    ]);

    return fetch(`${this.__url__}/user/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === "KO") throw new ApiError(res.error)
        if (res.data) delete res.data.app;
        return res;
      });
  },

  update(id, token, data) {
    validate.arguments([
      { name: 'id', value: id, type: 'string', notEmpty: true },
      { name: 'token', value: token, type: 'string', notEmpty: true },
      { name: 'data', value: data, type: 'object' },
    ]);

    return fetch(`${this.__url__}/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json());
  },

  updateAndCheckDeleted(id, token, user) {
    validate.arguments([
      { name: 'id', value: id, type: 'string', notEmpty: true },
      { name: 'token', value: token, type: 'string', notEmpty: true},
      { name: 'user', value: user, type: 'object' },
      { name: 'user.id', value: user.id, type: 'string', notEmpty: true },
    ]);

    if (!user.username) {
      user.username = user.email;
    }

    return userApi
      .retrieve(id, token)
      .then(res => {
        if (res.status !== 'OK') throw new ValueError('unexpected KO retrieving user data');
        const userRetrieved = res.data;
        const keysToDelete = {};
        for (let key in userRetrieved) {
          if (!['password', 'id', 'username'].includes(key) && typeof user[key] === 'undefined') {
            keysToDelete[key] = null;
          }
        }
        return userApi.update(id, token, keysToDelete);
      })
      .then(res => {
        if (res.status !== 'OK') throw new ValueError('unexpected KO deleting fields');
        return userApi.update(id, token, user);
      });
  },

  delete(id, token, username, password) {
    validate.arguments([
      { name: 'id', value: id, type: 'string', notEmpty: true },
      { name: 'token', value: token, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true },
      { name: 'username', value: username, type: 'string', notEmpty: true },
    ]);

    return fetch(`${this.__url__}/user/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json());
  },
};

export default userApi;
