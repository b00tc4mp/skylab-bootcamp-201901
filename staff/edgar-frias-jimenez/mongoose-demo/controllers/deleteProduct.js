'use strict'

const Product = require('../models/product')

function deleteProduct(req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: `Error "${err}": fail to delete the product` })
    if(!product) return res.status(404).send({ message: `Error "${err}": Product ${productId} not found on database` })

    product.remove(err => {
      if(err) return res.status(500).send({ message: `Error "${err}": fail to delete the product` })
      res.status(200).send({ message: 'The product has been successfully deleted from database'})
    })
  })
}

module.exports = deleteProduct
