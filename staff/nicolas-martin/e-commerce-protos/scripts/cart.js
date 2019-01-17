function Cart() {
  this.products = [];
}

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
    return (acc.price > productNext.price) ? acc : productNext;
  });
};

Cart.prototype.cheapest = function() {
  return this.products.reduce(function(acc, productNext){
    return(acc.price < productNext.price) ? acc : productNext;
  });
};

Cart.prototype.numberOf = function(category) {
  // var res = this.products.filter(function(product){
  //   return product instanceof category;
  // });
  // return res.length;
  if (category instace)
  return this.products.reduce(function(accum, product){
    return product instanceof type ? ++accum : accum;
  });
  
};

Cart.prototype.productsByPriceRange = function(min, max) {
  if ()
  return this.products.filter(function(product){
     return product.price >= min && product.price <= max;
  });
};

Cart.prototype.add = function(product) {
  if () throw TypeError
  this.products.push(product);
};
