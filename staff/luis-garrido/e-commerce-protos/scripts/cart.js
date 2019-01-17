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

  this.numberOfItems = function(string) {
    return this.products.length;
  };

  this.mostExpensive = function() {
    return this.products.reduce(function(a, b) {
      a = a.price > b.price ? a : b;
      return a;
    });
  };

  this.cheapest = function() {
    return this.products.reduce(function(a, b) {
      a = a.price < b.price ? a : b;
      return a;
    });
  };

  this.numberOf = function(familyProduct) {
    return this.products.reduce(function(a, b){
      a = (b instanceof familyProduct) ? a+1 : a;
      return a;
    },0);
  };

  this.productsByPriceRange = function(lowestPrice, highestPrice) {
    return this.products.reduce(function(a,b){
      debugger;
      a = (b.price >= lowestPrice && b.price <= highestPrice) ? a.concat([b]) : a;
      return a;
    },[]);
  };
}
