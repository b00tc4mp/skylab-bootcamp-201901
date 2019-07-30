const express = require('express');
const router = express.Router();

const { products, details } = require('../data/products');

router.get('/products/', (req, res) => {
  return res.send(products);
});

router.get('/products/search/:searchText', (req, res) => {
  const { searchText } = req.params;

  let result = details.filter(detail => {
    const {
      product_name,
      product_id,
      model_number,
      subtitle,
      productType,
      search_color,
      description_headline,
      description_bullets,
    } = detail;
    let composeString = `${product_name},${product_id},${model_number},${subtitle},${subtitle},${description_headline},`
    composeString += productType || productType.join();
    composeString += search_color || search_color.join(),
    composeString += description_bullets || description_bullets.join();
    composeString = composeString.toLowerCase();
    return composeString.includes(searchText.toLowerCase().trim());
  });
  result = result.map(detail => products.find(product => detail.product_id === product.product_id));
  return res.send(result);
});

router.get('/product/:id', (req, res) => {
  const { id } = req.params;
  res.send(products.find(item => item.product_id === id));
});

router.get('/product/detail/:id', (req, res) => {
  const { id } = req.params;
  console.log(details.length);
  res.send(details.find(item => item.product_id === id));
});

module.exports = router;
