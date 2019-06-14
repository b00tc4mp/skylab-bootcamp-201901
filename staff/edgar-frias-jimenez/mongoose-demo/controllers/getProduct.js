'use strict'
const Product = require('../models/product')

function getProduct(req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: `Error "${err}": bad request to database` })
    if(!product) return res.status(404).send({ message: `Error "${err}": Product ${productId} not found on database` })

    res.status(200).send({ product })
  })
}

module.exports = getProduct
