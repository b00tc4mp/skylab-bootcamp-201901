
function Cart(){
    this.cartList=[];
};

Cart.prototype.add=function(object){
    this.cartList.push(object);
    return this.cartList
}

Cart.prototype.totalPrice=function(){
    
    var sum=this.cartList.reduce(function(acum,product){
        return acum+product.price
    },0);
    
    // var sum=0

    // for (var i=0; i<this.cartList.length; i++){
    //     sum +=this.cartList[i].price
    // }
    
    return sum
}

Cart.prototype.numberOfItems=function(){
    return this.cartList.length
}

Cart.prototype.mostExpensive=function(){
    return this.cartList.reduce(function(acum,product){
        return acum.price<product.price? product:acum
   
    });
    // var expensive=0;

    // for (var i=1; i<this.cartList.length; i++){
    //     if(this.cartList[i].price>this.cartList[expensive].price){
    //         expensive=i
    //     }
    // }
    // return this.cartList[expensive]
}

Cart.prototype.cheapest=function(){
    return this.cartList.reduce(function(acum,product){
        return acum.price>product.price? product:acum
    });
    // var cheap=0;
    // for (var i=1; i<this.cartList.length; i++){
    //     if(this.cartList[i].price<this.cartList[cheap].price){
    //         cheap=i
    //     }
    // }
    // return this.cartList[cheap]

}

Cart.prototype.productsByPriceRange=function(min, max){

    if(typeof min !== 'number') throw TypeError(min + ' is not a number')
    if(typeof max !=='number') throw TypeError(max + ' is not a number')

    return this.cartList.filter(function(product){
        return product.price>=min && product.price<=max
    });
    
    // var range=[];
    // for (var i=0; i<this.cartList.length; i++){
        
    //     if(this.cartList[i].price>=start && this.cartList[i].price<=end){
    //         range.push(this.cartList[i])
    //     }
    // }

    // return range
}

Cart.prototype.numberOf=function(type){
    if(!(type instanceof Function)) throw TypeError(type +' is not a Function')
    if(type !== Product && !(type.prototype instanceof Product)) throw TypeError(type +' is not a Function')
  
    return this.cartList.reduce(function(acum,product){
        return product instanceof type? ++acum : acum;
    },0);

    // var typeSum=0;

    // for (var i=0; i<this.cartList.length; i++){
    //     if(this.cartList[i] instanceof type){
    //         typeSum +=1
    //     }
    // }

    // return typeSum
}