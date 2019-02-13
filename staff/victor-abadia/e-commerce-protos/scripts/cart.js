function Cart() {
    this.products = [];

    // WARN!
    // this.numberOfItems = function() {

    // };
}

Cart.prototype.add = function (product) {
    if (!(product instanceof Product)) throw TypeError(product + ' is not a product');

    this.products.push(product);
};

Cart.prototype.totalPrice = function () {
    return this.products.reduce(function (accum, product) {
        return accum + product.price;
    }, 0);
};

Cart.prototype.numberOfItems = function () {
    return this.products.length;
};

Cart.prototype.mostExpensive = function () {
    return this.products.reduce(function (accum, product) {
        return accum.price < product.price ? product : accum;
    });
};

Cart.prototype.cheapest = function () {
    return this.products.reduce(function (accum, product) {
        return accum.price > product.price ? product : accum;
    });
};

Cart.prototype.numberOf = function (type) {
    if (typeof type !== 'function') throw TypeError(type + ' is not a function');
    if (type !== Product && !(type.prototype instanceof Product)) throw TypeError(type + ' is not a product type');

    return this.products.reduce(function (accum, product) {
        return product instanceof type ? ++accum : accum;
    }, 0);
};

Cart.prototype.productsByPriceRange = function (min, max) {
    if (typeof min !== 'number') throw TypeError(min + ' is not a number');
    if (typeof max !== 'number') throw TypeError(max + ' is not a number');

    return this.products.filter(function (product) {
        return product.price >= min && product.price <= max;
    })
};