function Cart(){
    this.products = [];

};

Cart.prototype.add = function(Product){
    return this.products.push(Product);
};

// console.log('total', cart.totalPrice());

Cart.prototype.totalPrice = function(){

    return this.products.reduce(function(valorAnterior, valorActual){        
        
        return valorAnterior + valorActual.price;
    }, 0);
};

// console.log('number of items', cart.numberOfItems());

Cart.prototype.numberOfItems = function(){


    return this.products.length
};

// console.log('most expensive', cart.mostExpensive());

Cart.prototype.mostExpensive = function () {
    return this.products.reduce(function (accum, product) {
        return accum.price < product.price ? product : accum;
    });
};

// console.log('cheapest', cart.cheapest());

Cart.prototype.cheapest = function () {
    return this.products.reduce(function (accum, product) {
        return accum.price > product.price ? product : accum;
    });
};

// console.log('number of clothing items', cart.numberOf(Clothing));


Cart.prototype.numberOf = function (type) {
    if (typeof type !== 'function') throw TypeError(type + ' is not a function');
    if (type !== Product && !(type.prototype instanceof Product)) throw TypeError(type + ' is not a product type');

    return this.products.reduce(function (accum, product) {
        return product instanceof type ? ++accum : accum;
    }, 0);
};

// console.log('number of electronics items', cart.numberOf(Electronics));



// console.log('products in between prices', cart.productsByPriceRange(30, 120));

Cart.prototype.productsByPriceRange = function(min, max) {
    if (typeof min !== 'number') throw TypeError(min + ' is not a number');
    if (typeof max !== 'number') throw TypeError(max + ' is not a number');

    return this.products.filter(function(product) {
        return product.price >= min && product.price <= max;
    })
};
