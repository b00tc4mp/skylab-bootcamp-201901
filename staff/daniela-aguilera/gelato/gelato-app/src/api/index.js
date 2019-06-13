import validate from 'gelato-validation'
import call from '../common/call'

const { REACT_APP_HEROKU_URL } = process.env
const restApi = {
  __url__: REACT_APP_HEROKU_URL,
  __timeout__: 0,

  /**
     * Registers a user.
     *
     * @param {String} name
     * @param {String} surname
     * @param {String} email
     * @param {String} password
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty
     */
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

  /**
     * Authenticates a user.
     *
     * @param {String} email
     * @param {String} password
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty, email is not found or password does not match.
     *
     * @returns {String} - token.
     */

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

  /**
     * Retrieve user
     *@param {String} - token
     * @throws {TypeError} - if token is not a string.
     * @returns {Object} - user.
     */

  retrieveUser (token) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true }
    ])

    return call(`${this.__url__}/user`, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  },
  /**
     * Delete an user.
     *@param {String} - token
     * @throws {TypeError} - if token is not a string.
     *
     */

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

  /**
     * Updates a user.
     *
     * @param {Object} data
     *
     * @throws {TypeError} - if data is not an object.
     * @throws {Error} - if any data is empty.
     *@param {String} - token
     * @throws {TypeError} - if token is not a string.
     */

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

  /**
     * add order
     *
     * @param {Object} - flavors
     * @param {String} - size
     * @param {String} - type
     * @param {Number} - TotalPrice
     * @param {String} - Token
     * @throws {TypeError} - if any param is not a string or if flavors is not and object, if
     *  totalPrice is not a number or if token is not a string
     * @throws {Error} - if any param is empty
     */

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

  /**
     * Retrieve user orders
     * @param {String} - token
     * @throws {TypeError} - if Token is not a string
     * @returns {Object} - orders
     */

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

  /**
     * Retrieve user orders
     * @param {String} - id
     * @throws {TypeError} - if id is not a string
     * @returns {Object} - orders
     */

  retrieveOneOrder (id) {
    validate.arguments([
      // { name: 'token', value: token, type: 'string', notEmpty: true },
      { name: 'id', value: id, type: 'string', notEmpty: true }
    ])

    return call(`${this.__url__}/user/order/${id}`, {
      method: 'GET',
      // headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  },

  /**
     * Retrieve user orders
     * @param {String} - id
     * @param {String} -token
     * @throws {TypeError} - if id or token is not a string
     *
     */
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

  /**
     * Retrieve user orders
     * @param {String} - token
     * @throws {TypeError} - if token is not a string
     * @returns {Object} - orders
     */
  retrieveAllUsersOrders (token) {
    return call(`${this.__url__}/store/orders`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  },

  /**
     * Retrieve user orders
     * @param {Object} - formdata
     * @throws {TypeError} - if token is not an object
     */

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

  /**
     * Retrieve events
     * @returns {Object} - events
     */

  retrieveEvents () {
    return call(`${this.__url__}/events`, {
      method: 'GET',
      // headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  },

  /**
     * Delete event
     * @param {String} - eventId
     * @param {String} - token
     * @throws {TypeError} - if eventId or token is not a string
     */

  deleteEvent (token, eventId) {
    validate.arguments([
      { name: 'token', value: token, type: 'string', notEmpty: true }
    ])

    return call(`${this.__url__}/events/${eventId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      timeout: this.__timeout__
    })
  }
}

export default restApi
