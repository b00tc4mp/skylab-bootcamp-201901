import validate from 'gelato-validation'
import { normalize } from '../common/normalize'
import restApi from '../api'

export default {
  set __userToken__ (token) {
    window.sessionStorage.userToken = token
  },

  set __userIsAdmin__ (isAdmin) {
    window.sessionStorage.userIsAdmin = isAdmin
  },

  get __userToken__ () {
    return normalize.undefinedOrNull(window.sessionStorage.userToken)
  },

  get __userIsAdmin__ () {
    const userIsAdmin = normalize.undefinedOrNull(window.sessionStorage.userIsAdmin)
    return typeof userIsAdmin !== 'undefined'
      ? JSON.parse(userIsAdmin)
      : false
  },

  get isUserLoggedIn () {
    return !!this.__userToken__
  },

  get isUserAdmin () {
    return !!this.__userIsAdmin__
  },

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

  async authenticateUser (email, password) {
    validate.arguments([
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true }
    ])

    const response = await restApi.authenticateUser(email, password)
    if (response) {
      console.log(response.isAdmin)
      const { token, isAdmin } = response
      this.__userToken__ = token
      this.__userIsAdmin__ = isAdmin
    }
  },

  retrieveUserBy () {
    return restApi.retrieveUser(this.__userToken__)
  },

  updateUser (data) {
    validate.arguments([
      { name: 'data', value: data, type: 'object', notEmpty: true }
    ])

    return restApi.updateUser(this.__userToken__, data)
  },

  deleteUser () {
    return restApi.deleteUser(this.__userToken__)
  },

  addOrder (flavors, size, type, totalPrice) {
    validate.arguments([
      { name: 'flavors', value: flavors, type: 'object', notEmpty: true },
      { name: 'size', value: size, type: 'string', notEmpty: true },
      { name: 'type', value: type, type: 'string', notEmpty: true },
      { name: 'totalPrice', value: totalPrice, type: 'number', notEmpty: true }
    ])
    return restApi.addOrder(this.__userToken__, flavors, size, type, totalPrice)
  },

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

  retrieveEvents () {
    return restApi.retrieveEvents()
  },

  deleteEvent (eventId) {
    return restApi.deleteEvent(this.__userToken__, eventId)
  },

  retrieveUserOrders () {
    return restApi.retrieveOrdersByUserId(this.__userToken__)
  },

  retrieveOneOrder (id) {
    return restApi.retrieveOneOrder(this.__userToken__, id)
  },

  removeOneOrderBy (id) {
    return restApi.removeOneOrder(this.__userToken__, id)
  },

  retrieveAllUsersOrders () {
    return restApi.retrieveAllUsersOrders(this.__userToken__)
  },

  logoutUser () {
    window.sessionStorage.clear()
  }

}
