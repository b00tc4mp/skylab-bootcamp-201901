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
    return normalize.undefinedOrNull(window.sessionStorage.userIsAdmin)
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
      console.log(response)
      const { token, isAdmin } = response
      console.log({ token, isAdmin })
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
    return restApi.retrieveAllUsersOrders()
  },

  logoutUser () {
    window.sessionStorage.clear()
  }

}
