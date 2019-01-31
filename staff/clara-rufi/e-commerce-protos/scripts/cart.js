function Cart (){
    this.products = [] 
    /*creem llista buida de productes*/ 
}

Cart.prototype.add = function(product){  
    if (!(product instanceof Product)) throw TypeError(product + ' is not a product');
    /* prototype es para q la función se pueda utTypeErrorilizar a Cart,
    pq totes les instancies de cart quedin lligades
    creem la funció add, pq es vagin afegint els elements
    a Cart.*/
    this.products.push(product)
}

/*podem buscar Cart.products i veurem array de productes
o per producte, bra*/

Cart.prototype.totalPrice = function(){
    return this.products.reduce(function(previousValue, currentValue, index, array) {

         return previousValue + currentValue.price;
    }, 0); 
}



Cart.prototype.numberOfItems = function(){
 return this.products.length
}

/*
Cart.prototype.mostExpensive = function(){
    var expensive = this.products.map(function(product){
        return product.price
        //fem un map crea una nova array
    }).sort(function(a, b){return a-b}).pop();

    return expensive
}

no fem servir el map, pq el map canvia l'array original

 /*amb el sort, es canvia l'ordre, millor fer un reduce*/


/*Cart.prototype.mostExpensive = function(){
    var items = this.products //fem copia array x no modificar
    var expensive = items.sort(function(a, b){return a.price-b.price}).pop();
    console.log(expensive)
  
   
    return expensive
}
/*
mostExpensive amb reduce:

Cart.prototype.mostExpensive = function(){
   return this.products.reduce(function(accum, product){
       return accum.price < product.price? product:accum;
   });
});


Cart.prototype.cheapest = function(){
    var cheapest = this.products.map(function(product){
        return product.price
        //fem un map crea una nova array
    }).sort(function(a, b){return b-a}).pop();

    return cheapest
}


Cart.prototype.numberOf= function(type){
    var counter = 0;
    for (var i=0; i<this.products.length; i++){
        if (this.products[i] instanceof type){
            counter++;
        }
    } return counter

}

/* recorrem array per saber num de clothes i d'electronics 
q formen part de products amb el instanceof. li passem el parametre type
pq aixi ens val per clothes i electronics*/ 

/*
Cart.prototype.productsByPriceRange= function(){
    var btwprice = [];
    for (var i=0; i<this.products.length; i++){
        if (this.products[i].price > 30 && this.products[i].price < 120){

            console.log(this.products[i].price)
            console.log(this.products[i])
           
            btwprice.push(this.products[i])
        }
    } return btwprice

}*/

/*
Cart.prototype.productsByPriceRange = function(){
    var btw = this.products.reduce(function (total, amount) {
        if (amount.price > 30 && amount.price < 120) {
          btw.push(amount.price);
        }
        return total;
    }, []);
    return btw
}
*/


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

Cart.prototype.productsByPriceRange = function(min, max) {
    if (typeof min !== 'number') throw TypeError(min + ' is not a number');
    if (typeof max !== 'number') throw TypeError(max + ' is not a number');

    return this.products.filter(function(product) {
        return product.price >= min && product.price <= max;
    })
};

