function Cart() {
  this.products = [];
}

Cart.prototype.add = function(product) {
  this.products.push(product);
};

Cart.prototype.totalPrice = function() {
  return this.products.reduce(function(a, b) {
    return a + b.price;
  }, 0);
};

Cart.prototype.numberOfItems = function() {
  return this.products.length;
};

Cart.prototype.mostExpensive = function() {
  return this.products.reduce(function(acc, productNext){
    if (acc.price > productNext.price){
      return acc;
    } else {
      return productNext;
    }
    //return acc.price > productNext.price ? acc : productNext;
  });
};

Cart.prototype.cheapest = function() {
  return this.products.reduce(function(acc, productNext){
    return(acc.price < productNext.price) ? acc : productNext;
  });
};

Cart.prototype.numberOf = function(type) {
  if (typeof type !== 'function') throw TypeError(type + ' is not a function');
  if (!(type !== Product) && !(type.prototype instanceof Product)) throw TypeError(type + ' is not a product type');

  return this.products.reduce(function (accum, product) {
      return product instanceof type ? ++accum : accum;
  }, 0);
};

Cart.prototype.productsByPriceRange = function(min, max) {
  if (typeof min !== 'number') throw TypeError(min + ' min value is not a Number');
  if (typeof max !== 'number') throw TypeError(max + ' max value is not a Number');
  return this.products.filter(function(product){
     return product.price >= min && product.price <= max;
  });
};