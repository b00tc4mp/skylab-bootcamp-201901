import validate from 'gelato-validation'
import { normalize } from '../common/normalize'
import restApi from '../api'

export default {
  /**
     * Save in the sessionStorage the token
     *
     */
  set __userToken__ (token) {
    window.sessionStorage.userToken = token
  },
  /**
     * Save in the sessionStorage if the user is admin or not
     *
     */

  set __userIsAdmin__ (isAdmin) {
    window.sessionStorage.userIsAdmin = isAdmin
  },

  /**
     * @returns {Token}
     *
     */

  get __userToken__ () {
    return normalize.undefinedOrNull(window.sessionStorage.userToken)
  },

  /**
     * @returns {Boolean}
     *
     */

  get __userIsAdmin__ () {
    const userIsAdmin = normalize.undefinedOrNull(window.sessionStorage.userIsAdmin)
    return typeof userIsAdmin !== 'undefined'
      ? JSON.parse(userIsAdmin)
      : false
  },

  /**
     * Checks if user is logged in.
     *@returns {Boolean}
     */
  get isUserLoggedIn () {
    return !!this.__userToken__
  },

  /**
     * Checks if user is admin.
     *@returns {Boolean}
     */

  get isUserAdmin () {
    return !!this.__userIsAdmin__
  },
  /**
     * Registers a user.
     *
     * @param {String} - name
     * @param {String} - surname
     * @param {String} - email
     * @param {String} - password
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty or password and password confirm do not match.
     */

  registerUser (name, surname, email, password) {
    validate.arguments([
      { name: 'name', value: name, type: 'string', notEmpty: true },
      { name: 'surname', value: surname, type: 'string', notEmpty: true },
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true }
    ])

    validate.email(email)

    return restApi.registerUser(name, surname, email, password)
  },

  /**
     * Authenticates a user.
     *
     * @param {String} - email
     * @param {String} - password
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty, email is not found or password does not match.
     *
     * @returns {String} - token.
     */

  async authenticateUser (email, password) {
    validate.arguments([
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true }
    ])

    const response = await restApi.authenticateUser(email, password)
    if (response) {
      const { token, isAdmin } = response
      this.__userToken__ = token
      this.__userIsAdmin__ = isAdmin
    }
  },

  /**
     * Retrieves user
     *
     * @returns {Object} - user.
     */

  retrieveUserBy () {
    return restApi.retrieveUser(this.__userToken__)
  },

  /**
     * Updates a user.
     *
     * @param {Object} - data
     *
     * @throws {TypeError} - if data is not an object.
     * @throws {Error} - if any data is empty.
     *
     * @returns {Object} - user.
     */

  updateUser (data) {
    validate.arguments([
      { name: 'data', value: data, type: 'object', notEmpty: true }
    ])

    return restApi.updateUser(this.__userToken__, data)
  },

  /**
     * Delete an user.
     *
     */

  deleteUser () {
    return restApi.deleteUser(this.__userToken__)
  },
  /**
     * add order
     *
     * @param {Object} - flavors
     * @param {String} - size
     * @param {String} - type
     * @param {Number} - TotalPrice
     * @throws {TypeError} - if any param is not a string or if flavors is not and object or if
     *  totalPrice is not a number
     * @throws {Error} - if any param is empty
     */

  addOrder (flavors, size, type, totalPrice) {
    validate.arguments([
      { name: 'flavors', value: flavors, type: 'object', notEmpty: true },
      { name: 'size', value: size, type: 'string', notEmpty: true },
      { name: 'type', value: type, type: 'string', notEmpty: true },
      { name: 'totalPrice', value: totalPrice, type: 'number', notEmpty: true }
    ])
    return restApi.addOrder(this.__userToken__, flavors, size, type, totalPrice)
  },

  /**
     * Create event
     *
     * @param {String} - title
     * @param {String} - description
     * @param {String} - date
     * @param {Object} - image
     * @throws {TypeError} - if any param is not a string or if the image is not an object
     * @throws {Error} - if any param is empty
     */

  createEvent (title, description, date, image) {
    validate.arguments([
      { name: 'title', value: title, type: 'string', notEmpty: true },
      { name: 'description', value: description, type: 'string', notEmpty: true },
      { name: 'image', value: image, type: 'object', optional: false },
      { name: 'date', value: date, type: 'string', optional: false }
    ])

    const formData = new window.FormData()

    formData.append('title', title)
    formData.append('description', description)
    formData.append('date', date)
    formData.append('image', image)

    return restApi.createEvent(formData, this.__userToken__)
  },

  /**
     * Retrieve events
     * @returns {Object} - events
     */

  retrieveEvents () {
    return restApi.retrieveEvents()
  },

  /**
     * Delete event
     * @param {String} - eventId
     * @throws {TypeError} - if eventId is not a string
     */

  deleteEvent (eventId) {
    return restApi.deleteEvent(this.__userToken__, eventId)
  },

  /**
     * Retrieve user orders
     * @returns {Object} - orders
     */

  retrieveUserOrders () {
    return restApi.retrieveOrdersByUserId(this.__userToken__)
  },

  /**
     * Retrieve user order
     * @returns {Object} - order
     */
  retrieveOneOrder (id) {
    return restApi.retrieveOneOrder(id)
  },

  /**
     * Remove one order
     * @param {String}
     */

  removeOneOrderBy (id) {
    return restApi.removeOneOrder(this.__userToken__, id)
  },

  /**
     * Retrieve all users orders
    * @returns {Object} - orders
     */

  retrieveAllUsersOrders () {
    return restApi.retrieveAllUsersOrders(this.__userToken__)
  },

  /**
     * Logout the user.
     */

  logoutUser () {
    window.sessionStorage.clear()
  }

}
