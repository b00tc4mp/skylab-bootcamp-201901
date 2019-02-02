function Cart() {
  this.list = [];
}

Cart.prototype.add = function(product) {
  if (!(product instanceof Product))
    throw TypeError(product + " is not a product");
  this.list.push(product);
};

Cart.prototype.totalPrice = function() {
  return this.list.reduce(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue.price;
  }, 0);
};
Cart.prototype.numberOfItems = function() {
  return this.list.length;
};

Cart.prototype.mostExpensive = function() {
  /*var max = 0;
    for(var i=0; i<cart.list.length; i++){
        if(cart.list[i].price>max){
            max = cart.list[i].price;
            var value = cart.list[i];
        }
    }*/

  return this.list.reduce(function(accum, product) {
    return accum.price < product.price ? product : accum;
  });
};

Cart.prototype.cheapest = function() {
  /*var min=cart.list[0].price;
    for(var i=1; i<cart.list.length; i++){
        if(cart.list[i].price<min){
            min = cart.list[i].price;
            var value = cart.list[i];
        } else {
            value = min;
        }
    }
   return value;*/
  return this.list.reduce(function(accum, product) {
    return accum.price > product.price ? product : accum;
  });
};

Cart.prototype.numberOf = function(item) {
  /*if (typeof item !== "function") throw TypeError(item + "is not a function");
  if (item !== Product && !(item.prototype instanceof Product))
    throw TypeError(item + "is not a function");

  var result = cart.list.filter(function(listItem) {
    return listItem instanceof item;
  });
  return result.length;*/
  if (typeof item !== "function") throw TypeError(item + " is not a function");
  if (item !== Product && !(item.prototype instanceof Product))
    throw TypeError(item + " is not a product type");

  return this.list.reduce(function(accum, product) {
    return product instanceof item ? ++accum : accum;
  }, 0);
};

Cart.prototype.productsByPriceRange = function(min, max) {
  if (typeof min !== "number") throw TypeError(min + " is not a number");
  if (typeof max !== "number") throw TypeError(max + " is not a number");

  return this.list.filter(function(product) {
    return product.price >= min && product.price <= max;
  });
};
