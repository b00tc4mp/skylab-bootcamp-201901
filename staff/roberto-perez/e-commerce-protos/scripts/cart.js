function Cart() {
  this.products = [];
}

Cart.prototype.add = function(product) {
  if (!product instanceof Product)
    throw new TypeError(product + " is not a product");

  return this.products.push(product);
};

Cart.prototype.totalPrice = function() {
  return this.products.reduce(function(accum, product) {
    return accum + product.price;
  }, 0);
};

Cart.prototype.numberOfItems = function() {
  return this.products.length;
};

Cart.prototype.mostExpensive = function() {
  return this.products.reduce(function(accum, product) {
    return accum.price < product.price ? product : accum;
  });
};

Cart.prototype.cheapest = function() {
  return this.products.reduce(function(accum, product) {
    return accum.price > product.price ? product : accum;
  });
};

Cart.prototype.productsByPriceRange = function(min, max) {
  if (typeof min !== "number")
    throw new TypeError(product + " is not a number");

  if (typeof max !== "number")
    throw new TypeError(product + " is not a number");

  return this.products.filter(function(product) {
    return product.price >= min && product.price <= max;
  });
};

Cart.prototype.numberOf = function(type) {
  if (typeof type !== "function")
    throw new TypeError(product + " is not a function");

  if (type !== Product && !type instanceof Product)
    throw new TypeError(product + " is not a product");

  return this.products.reduce(function(accum, product) {
    return product instanceof type ? ++accum : accum;
  }, 0);
};
