function Cart(){
    this.products = []

    this.add = function(items){
        this.products.push(items);
    };

}

Cart.prototype.totalPrice = function(){
    return this.products.reduce(function(a,product){
    return a + product.price 
    },0)
}


Cart.prototype.numberOfItems = function (){
    return this.products.length
}

Cart.prototype.mostExpensive = function(){
    var mostExp = this.products[0]
    for (var i = 0 ; i<this.products.length;i++){
        if (this.products[i].price > mostExp.price)
            mostExp = this.products[i]
    }
    return mostExp
}

Cart.prototype.cheapest = function(){
    var cheap = this.products[0]
    for (var i = 0 ; i<this.products.length;i++){
        if (this.products[i].price < cheap.price)
            cheap = this.products[i]
    }
    return cheap
}

Cart.prototype.numberOf=function(productType){
    var num = 0
    for (var i = 0;i<this.products.length;i++){
        if(this.products[i] instanceof productType){
            num++
        }
    }
   return num
}

Cart.prototype.productsByPriceRange = function(min,max){
    var productBeet = []
    for (var i = 0;i<this.products.length;i++){
        if(this.products[i].price>min && this.products[i].price<max){
            productBeet.push(this.products[i])
        }
    }
    return productBeet
}

