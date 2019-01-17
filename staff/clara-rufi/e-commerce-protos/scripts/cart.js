function Cart (){
    this.products = [] 
    /*creem llista buida de productes*/ 
}

Cart.prototype.add = function(product){  
    /* prototype es para q la función se pueda utilizar a Cart,
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
*/

Cart.prototype.mostExpensive = function(){
    var items = this.products //fem copia array x no modificar
    var expensive = items.sort(function(a, b){return a.price-b.price}).pop();
    console.log(expensive)
  
    /*amb el sort, es canvia l'ordre, millor fer un reduce*/
    return expensive
}


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


Cart.prototype.productsByPriceRange = function(){
    var btw = this.products.reduce(function (total, amount) {
        if (amount.price > 30 && amount.price < 120) {
          btw.push(amount.price);
        }
        return total;
    }, []);
    return btw
}

