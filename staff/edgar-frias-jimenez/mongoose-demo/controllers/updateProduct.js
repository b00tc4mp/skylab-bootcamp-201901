'use strict'

const Product = require('../models/product')

function updateProduct(req, res) {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if(err) res.status(500).send({ message: `Error "${err}": failed on update your product` })

    res.status(200).send({ product: productUpdated })
  })
}

module.exports = updateProduct
