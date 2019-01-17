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

Cart.prototype.totalPrice = function(){

    return this.products.reduce(function(acumm, product){        
        return accum.price < product.price? product : acumm;
    });
};

// console.log('cheapest', cart.cheapest());

Cart.prototype.cart.cheapest = function(){

    return this.products.reduce(function(acumm, product){        
        return aproduct instanceof type? ++accum : accum;
    });
};

// console.log('number of clothing items', cart.numberOf(Clothing));



// console.log('number of electronics items', cart.numberOf(Electronics));



// console.log('products in between prices', cart.productsByPriceRange(30, 120));

Cart.prototype.productsByPriceRange = function(min, max){
    if (typeof min !== 'number') throw TypeError (min + ' is not a number');
    if (typeof max !== 'number') throw TypeError (max + ' is not a number');

    return this.products



    
}