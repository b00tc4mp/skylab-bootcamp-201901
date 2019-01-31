function Cart() {
    this.cartList = [];
}

Cart.prototype.add = function (product) {
    if (!(product instanceof Product)) throw TypeError('The item is not a product');
    this.cartList.push(product);
};

Cart.prototype.totalPrice = function () {
    return this.cartList.reduce(function (accumulator, product) {
        return accumulator + product.price;
    }, 0);
};

Cart.prototype.numberOfItems = function () {
    return this.cartList.length;
}

Cart.prototype.mostExpensive = function () {
    if(this.cartList.length == 0 ) return undefined;

    return this.cartList.reduce(function(accumulator, product) {
        return accumulator.price > product.price ? accumulator : product;
    });
}

Cart.prototype.cheapest = function () {
    if(this.cartList.length == 0 ) return undefined;

    return this.cartList.reduce(function(accumulator, product) {
        return accumulator.price < product.price ? accumulator : product;
    });
}

Cart.prototype.numberOf = function (type) {
    if (!(type instanceof Function)) throw TypeError('the type is not a Function type');

    return this.cartList.reduce(function(accumulator, product){
        return product instanceof type ? ++accumulator: accumulator;
    }, 0);
}

Cart.prototype.productsByPriceRange = function (min, max) {
    if (typeof min !== 'number') throw TypeError('min is not a number');
    if (typeof max !== 'number') throw TypeError('min is not a number');
    if (min > max) min = [max, max = min][0];

    return this.cartList.filter(function(product){
        return product.price >= min && product.price <= max; 
    });
}