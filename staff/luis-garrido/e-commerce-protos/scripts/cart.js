function Cart() {
  this.products = [];

  Cart.prototype.add = function(product) {
    this.products.push(product);
  };

  Cart.prototype.totalPrice = function() {
    return this.products.reduce(function(a, b) {
      return a + b.price;
    }, 0);
  };

  Cart.prototype.numberOfItems = function(string) {
    return this.products.length;
  };

  Cart.prototype.mostExpensive = function() {
    return this.products.reduce(function(a, b) {
      return a.price > b.price ? a : b;
    });
  };

  Cart.prototype.cheapest = function() {
    return this.products.reduce(function(a, b) {
      return a.price < b.price ? a : b;
    });
  };

  Cart.prototype.numberOf = function(familyProduct) {
    return this.products.reduce(function(a, b){
      return (b instanceof familyProduct) ? a+1 : a;
    },0);
  };

  Cart.prototype.productsByPriceRange = function(lowestPrice, highestPrice) {
    if (lowestPrice>highestPrice) {
      var temp = lowestPrice;
      lowestPrice = highestPrice;
      highestPrice = lowestPrice;
    }
    return this.products.reduce(function(a,b){
      return (b.price >= lowestPrice && b.price <= highestPrice) ? a.concat([b]) : a;
    },[]);
  };
}
