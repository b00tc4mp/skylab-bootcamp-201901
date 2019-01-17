function Cart(){
    this.arraybuy = []
    /**
     * add an item to the array
     */
}
Cart.prototype.add = function (item){
    if(!item instanceof Object) throw new Error ('Item not a object!')
    this.arraybuy.push(item)
}
/**
 * get Total price
 */
Cart.prototype.totalPrice = function(){

    if(arguments.length!== 0) throw new Error('Too many arguments')
    var total = 0;
    for(var i=0; i<this.arraybuy.length; i++){
        total += this.arraybuy[i].price
    }
    return total;
}

/**
 * get TNumber of Items of the array
 * 
 */
Cart.prototype.numberOfItems = function(){
    return this.arraybuy.length
}
/**
 * returns the item with the highest item price
 */
Cart.prototype.mostExpensive = function(){
    return this.arraybuy.reduce(function(accum, product){
        return accum.price < product.price? product: accum
    })
    // var most = 0
    // for(var i = 1 ;i < this.arraybuy.length; i++){
    //     if (this.arraybuy[i].price > this.arraybuy[most].price) most = i      
    // }
    // return this.arraybuy[most]

}
/**
 * returns the item with the cheapest item price
 */
Cart.prototype.cheapest = function(){
    var most = 0
    for(var i = 1 ;i < this.arraybuy.length; i++){
        if (this.arraybuy[i].price < this.arraybuy[most].price) most = i      
    }
    return this.arraybuy[most].brand + ' and price ' + this.arraybuy[most].price

}
/**
 * returns the number of items that matches the type in the parameter
 */
Cart.prototype.numberOf = function(type){
    if(type !=='function') throw new Error('Not a function')
    // var total = 0
    // for(var i = 0; i < this.arraybuy.length; i++){
    //     if (this.arraybuy[i] instanceof type) total++
    // }
    // return total

    return this.arraybuy.reduce(function(accum, product){
        return product instanceof type ? ++accum: accum;
    })
}
/**
 * returns the number of items that his price is between min and max
 */
Cart.prototype.productsByPriceRange = function(min, max){
    if(arguments.length !== 2) throw new Error('Too Many Arguments!')
    var arrayreturn = this.arraybuy.filter(function(element){
        return ((element.price >= min) && (element.price <= max))
    });
    return arrayreturn
}

Cart.prototype.filterby(type){
    var result = this.arraybuy.filter(function(product){
        return product instanceof type
    })
}

    /*
    const result = words.filter(function(word){
  return word.length > 6
    }*/

    /*
    Cart.prototype.add !== this.add

    Si lo hacemos de la primera manera lo insertamos en el prototype
    De la otra manera creamos una funcion para cada instancia, y no tiene porque ser igual.
    Los atributos de classe sí que se hacen de la manera this.arraybuy
    */
