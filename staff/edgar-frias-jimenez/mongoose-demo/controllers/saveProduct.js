'use strict'

const Product = require('../models/product')

function saveProduct(req, res) {
  console.log('POST /api/product')
  console.log(req.body)
  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if(err) res.status(500).send({ message: `Error "${err}": product has not been stored properly into the database` })
    res.status(200).send({ product: productStored })
  })
}

module.exports = saveProduct
