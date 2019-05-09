const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');
// const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json({}));
app.use(cors());

const getProducts = require('./data/products').getProducts;

getProducts(() => {
  app.listen(config.PORT, () => {
    app.use('/api/adidas/', require('./routes/adidas'));
    console.log(`Server started on port ${config.PORT}`);
  });
});
