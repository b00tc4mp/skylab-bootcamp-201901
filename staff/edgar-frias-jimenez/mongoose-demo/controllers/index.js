'use strict'

const getProduct = require('./getProduct')
const saveProduct = require('./saveProduct')
const getProducts = require('./getProducts')
const updateProduct = require('./updateProduct')
const deleteProduct = require('./deleteProduct')

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
