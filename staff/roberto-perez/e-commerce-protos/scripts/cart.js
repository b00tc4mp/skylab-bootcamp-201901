function Cart() {
  this.products = [];
}

Cart.prototype.add = function(product) {
  if (!(product instanceof Product))
    throw new TypeError(product + " is not a product");

  return this.products.push(product);
};

Cart.prototype.totalPrice = function() {
  return this.products.reduce(function(accum, product) {
    if (!product.price) product.price = 0;
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
  if (typeof min !== "number") throw new TypeError(`${min} is not a number`);

  if (typeof max !== "number") throw new TypeError(`${max} is not a number`);

  return this.products.filter(function(product) {
    return product.price >= min && product.price <= max;
  });
};

Cart.prototype.numberOf = function(type) {
  if (!(type instanceof Function)) 
    throw TypeError(type + " is not a Function");

  if (type !== Product && !(type.prototype instanceof Product))
    throw TypeError(type + " is not a product");

  return this.products.reduce(function(accum, product) {
    return product instanceof type ? ++accum : accum;
  }, 0);
};
