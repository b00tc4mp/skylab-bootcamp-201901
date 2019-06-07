import validate from 'gelato-validation'
import call from '../common/call'

const { REACT_APP_PORT = 8080 } = process.env

const restApi = {
  __url__: `http://localhost:${REACT_APP_PORT}/api`,
  __timeout__: 0,

  registerUser (name, surname, email, password) {
    validate.arguments([
      { name: 'name', value: name, type: 'string', notEmpty: true },
      { name: 'surname', value: surname, type: 'string', notEmpty: true },
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true }
    ])

    return call(`${this.__url__}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name, surname, email, password },
      timeout: this.__timeout__
    })
  },

  authenticateUser (email, password) {
    validate.arguments([
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true }
    ])

    return call(`${this.__url__}/user/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email, password },
      timeout: this.__timeout__
    })
  },

  retrieveUser (token) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true }
    ])

    return call(`${this.__url__}/user`, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  },

  deleteUser (token) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true }
    ])

    return call(`${this.__url__}/user`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  },

  updateUser (token, data) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true },
      { name: 'data', value: data, type: 'object', notEmpty: true }
    ])

    return call(`${this.__url__}/user/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: data,
      timeout: this.__timeout__
    })
  },

  addOrder (token, flavors, size, type, totalPrice) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true },
      { name: 'flavors', value: flavors, type: 'object', notEmpty: true },
      { name: 'size', value: size, type: 'string', notEmpty: true },
      { name: 'type', value: type, type: 'string', notEmpty: true },
      { name: 'totalPrice', value: totalPrice, type: 'number', notEmpty: true }
    ])

    return call(`${this.__url__}/user/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: { flavors, size, type, totalPrice },
      timeout: this.__timeout__
    })
  },

  retrieveOrdersByUserId (token) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true }
    ])

    return call(`${this.__url__}/user/orders`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  },

  retrieveOneOrder (token, id) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true },
      { name: 'id', value: id, type: 'string', notEmpty: true }
    ])

    return call(`${this.__url__}/user/order/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  },

  removeOneOrder (token, id) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true },
      { name: 'id', value: id, type: 'string', notEmpty: true }
    ])
    return call(`${this.__url__}/user/order/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  },

  retrieveAllUsersOrders (token) {
    return call(`${this.__url__}/store/orders`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  },

  createEvent (formData, token) {
    validate.arguments([
      { name: 'formData', value: formData, type: 'object', optional: false }
    ])

    return call(`${this.__url__}/store/event`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      body: formData,
      timeout: this.__timeout__
    })
  },

  retrieveEvents () {
    return call(`${this.__url__}/events`, {
      method: 'GET',
      // headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  }
}

export default restApi
