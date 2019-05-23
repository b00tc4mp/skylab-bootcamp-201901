'use strict'

const Product = require('../models/product')

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({ message: `Error "${err}": bad request to database` })
    if(!products) return res.status(404).send({ message: `Error "${err}": No products found on database` })

    res.status(200).send({ products })
  })
}

module.exports = getProducts
