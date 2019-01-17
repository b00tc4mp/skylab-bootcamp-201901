function Cart() {
  this.products = [];
}

Cart.prototype.add = function(Product) {
  return this.products.push(Product);
};

Cart.prototype.totalPrice = function() {
  // var total = 0;
  // for (product of this.products) {
  //   total += product.price;
  // }
  // return total;
  return this.products.reduce(function(valorAnterior, valorActual) {
    return valorAnterior + valorActual.price;
  }, 0);
};

Cart.prototype.numberOfItems = function() {
  return this.products.length;
};

Cart.prototype.mostExpensive = function() {
  // var mostExpensiveProduct = this.products[0];
  // for (product of this.products) {
  //   if (product.price > mostExpensiveProduct.price) {
  //     mostExpensiveProduct = product;
  //   }
  // }
  // return mostExpensiveProduct;

  return this.products.sort(function(a, b){
    return b.price - a.price;
  })[0];
};

Cart.prototype.cheapest = function() {
  // var cheapestProduct = this.products[0];
  // for (product of this.products) {
  //   if (product.price < cheapestProduct.price) {
  //     cheapestProduct = product;
  //   }
  // }
  // return cheapestProduct;
  return this.products.sort(function(a, b){
    return a.price - b.price;
  })[0];
};

Cart.prototype.productsByPriceRange = function(start, end) {
  // var productsByPriceRange = [];
  // var i = 0;
  // for (product of this.products) {
  //   if (product.price >= start && product.price <= end) {
  //     productsByPriceRange[i++] = product;
  //   }
  // }
  // return productsByPriceRange;
  return this.products.filter(function(product) {
    return product.price >= start && product.price <= end;
  });
};

Cart.prototype.numberOf = function(type) {
  // var numberOf = 0;
  // for (product of this.products) {
  //   if (product instanceof type) {
  //     numberOf++;
  //   }
  // }
  // return numberOf;
  return this.products.filter(function(product) {
    return product instanceof type;
  }).length;
};
