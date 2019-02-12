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
  var items = [];
  for (var i = 0; i < this.products.length; i++) items.push(this.products[i]);

  var orderProducts = items.sort(function(a, b) {
    return a.price - b.price;
  });
  return orderProducts.pop();
};

Cart.prototype.cheapest = function() {
  var items = [];
  for (var i = 0; i < this.products.length; i++) items.push(this.products[i]);

  var orderProducts = items.sort(function(a, b) {
    return b.price - a.price;
  });
  return orderProducts.pop();
};
Cart.prototype.numberOf = function() {
  return this.products.reduce(function(accum, product) {
    return product instanceof type ? ++accum : accum;
  }, 0);
};
