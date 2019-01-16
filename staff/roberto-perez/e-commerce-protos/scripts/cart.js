function Cart() {
  this.products = [];

  this.add = function(Product) {
    return this.products.push(Product);
  };

  this.totalPrice = function() {
    var total = 0;
    for (product of this.products) {
      total += product.price;
    }
    return total;
  };

  this.numberOfItems = function() {
    return this.products.length;
  };

  this.mostExpensive = function() {
    var mostExpensiveProduct = this.products[0];
    for (product of this.products) {
      if (product.price > mostExpensiveProduct.price) {
        mostExpensiveProduct = product;
      }
    }
    return mostExpensiveProduct;
  };

  this.cheapest = function() {
    var cheapestProduct = this.products[0];
    for (product of this.products) {
      if (product.price < cheapestProduct.price) {
        cheapestProduct = product;
      }
    }
    return cheapestProduct;
  };

  this.productsByPriceRange = function(start, end) {
    var productsByPriceRange = [];
    var i = 0;
    for (product of this.products) {
      if (product.price >= start && product.price <= end) {
        productsByPriceRange[i++] = product;
      }
    }
    return productsByPriceRange;
  };

  this.numberOf = function(type) {
    var numberOf = 0;
    for (product of this.products) {
      if (product instanceof type) {
        numberOf++;
      }
    }
    return numberOf;
  };
}

// Cart.prototype.add = function(Product) {
//   return this.products.push(Product);
// };

// Cart.prototype.totalPrice = function() {
//   var total = 0;
//   for (product of this.products) {
//     total = +product.price;
//   }
//   return total;
// };

// Cart.prototype.numberOfItems = function() {
//   return this.products.length;
// };

// Cart.prototype.mostExpensive = function() {
//   var mostExpensiveProduct = this.products[0];
//   for (product of this.products) {
//     if (product.price > mostExpensiveProduct.price) {
//       mostExpensiveProduct = product;
//     }
//   }
//   return mostExpensiveProduct;
// };

// Cart.prototype.cheapest = function() {
//   var cheapestProduct = this.products[0];
//   for (product of this.products) {
//     if (product.price < cheapestProduct.price) {
//       cheapestProduct = product;
//     }
//   }
//   return cheapestProduct;
// };

// Cart.prototype.productsByPriceRange = function(start, end) {
//   var productsByPriceRange = [];
//   var i = 0;
//   for (product of this.products) {
//     if (product.price >= start && product.price <= end) {
//       productsByPriceRange[i++] = product;
//     }
//   }
//   return productsByPriceRange;
// };

// Cart.prototype.numberOf = function(type) {
//   var numberOf = 0;
//   for (product of this.products) {
//     if (product instanceof type) {
//       numberOf++;
//     }
//   }
//   return numberOf;
// };
