function Cart() {
  this.products = [];

  this.add = function(product) {
    this.products.push(product);
  };

  this.totalPrice = function() {
    return this.products.reduce(function(a, b) {
      return a + b.price;
    }, 0);
  };

  this.numberOfItems = function() {
    return this.products.length;
  };

  this.mostExpensive = function() {
    var price = 0;
    var res = {};
    for (var i in this.products) {
      var product = this.products[i];
      if (price < product.price) {
         price =  product.price;
         res = product;
      }
    }
    return res;
  };

  this.cheapest = function() {
    var price = 0;
    var res = {};
    for (var i in this.products) {
      var product = this.products[i];
      if (price > product.price) {
         price =  product.price;
         res = product;
      }
    }
    return res;
  };

  this.numberOf = function(category) {
    return this.products.filter(function(product){
      return product instanceof category;
    });
  };

  this.productsByPriceRange = function(string) {
  };

}
