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

  retrieveAllUsersOrders () {
    return call(`${this.__url__}/store/orders`, {
      method: 'GET',
      timeout: this.__timeout__
    })
  }

  //   updateUser (token, data) {
  //     validate.arguments([
  //       { name: 'token', value: token, type: 'string', notEmpty: true },
  //       { name: 'data', value: data, type: 'object', notEmpty: true }
  //     ])

  //     return call(`${this.__url__}/users/update`, {
  //       method: 'PATCH',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       },
  //       body: data,
  //       timeout: this.__timeout__
  //     })
  //   },

  //   searchDucks (token, query) {
  //     validate.arguments([
  //       { name: 'token', value: token, type: 'string', notEmpty: true },
  //       { name: 'query', value: query, type: 'string' }
  //     ])

  //     return call(`${this.__url__}/ducks?query=${query}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       timeout: this.__timeout__
  //     })
  //   },

  //   toggleFavDuck (token, id) {
  //     validate.arguments([
  //       { name: 'token', value: token, type: 'string', notEmpty: true },
  //       { name: 'id', value: id, type: 'string', notEmpty: true }
  //     ])

  //     return call(`${this.__url__}/ducks/${id}/fav`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       timeout: this.__timeout__
  //     })
  //   },

  //   retrieveFavDucks (token) {
  //     validate.arguments([
  //       { name: 'token', value: token, type: 'string', notEmpty: true }
  //     ])

  //     return call(`${this.__url__}/ducks/fav`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       timeout: this.__timeout__
  //     })
  //   },

  //   addToCart (token, id) {
  //     validate.arguments([
  //       { name: 'token', value: token, type: 'string', notEmpty: true },
  //       { name: 'id', value: id, type: 'string', notEmpty: true }
  //     ])

  //     return call(`${this.__url__}/cart/${id}/add`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       timeout: this.__timeout__
  //     })
  //   },

  //   retrieveCartItems (token) {
  //     validate.arguments([
  //       { name: 'token', value: token, type: 'string', notEmpty: true }
  //     ])

//     return call(`${this.__url__}/cart`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       timeout: this.__timeout__
//     })
//   }
}

export default restApi
