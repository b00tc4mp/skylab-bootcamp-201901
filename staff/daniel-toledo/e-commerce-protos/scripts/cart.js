
function Cart(){
    this.cartList=[];
};

Cart.prototype.add=function(){
    for (var i=0; i<arguments.length; i++){
        this.cartList.push(arguments[i]);
    }
    return this.cartList
}

Cart.prototype.totalPrice=function(){
    
    var sum=this.cartList.reduce(function(acum,product){
        if(product.price===undefined) product.price=0
        return acum+product.price
    },0);

    return sum
}

Cart.prototype.numberOfItems=function(){
    return this.cartList.length
}

Cart.prototype.mostExpensive=function(){
    return this.cartList.reduce(function(acum,product){
        return acum.price<product.price? product:acum
   
    });
}

Cart.prototype.cheapest=function(){
    return this.cartList.reduce(function(acum,product){
        return acum.price>product.price? product:acum
    });
}

Cart.prototype.productsByPriceRange=function(min, max){

    if(typeof min !== 'number') throw TypeError(min + ' is not a number')
    if(typeof max !=='number') throw TypeError(max + ' is not a number')

    return this.cartList.filter(function(product){
        return product.price>=min && product.price<=max
    });
}

Cart.prototype.numberOf=function(type){
    
    if(!(type instanceof Function)) throw TypeError(type +' is not a Function')
    if(type !== Product && !(type.prototype instanceof Product)) throw TypeError(type +' is not a Function')
  
    return this.cartList.reduce(function(acum,product){
        return product instanceof type? ++acum : acum;
    },0);
}