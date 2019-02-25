import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom'
import singingLabApi from 'api'
import logic from './logic'

singingLabApi.token = function (token) {
  if (token) {
    sessionStorage.setItem('token', token)

    return
  }

  return sessionStorage.getItem('token')
}

logic.userId = function (userId) {
  if (userId === null)
    sessionStorage.removeItem('userId')
  else if (userId !== undefined) {
    sessionStorage.setItem('userId', userId)

    return
  }

  return sessionStorage.getItem('userId')
}

const cart = sessionStorage.getItem('cart')

if (cart && cart !== 'undefined') {
  logic._cart = JSON.parse(cart)
}

logic.cart = function (cart) {
  if (cart === null)
    sessionStorage.removeItem('cart')
  else if (cart) {
    this._cart = cart

    sessionStorage.setItem('cart', JSON.stringify(cart))

    return
  }

  return this._cart
}

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>, document.getElementById('root'));
registerServiceWorker();

