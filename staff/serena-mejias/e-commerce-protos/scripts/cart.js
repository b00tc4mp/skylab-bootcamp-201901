function Cart(){
    this.list = [];
};

Cart.prototype.add = function(prod){
    this.list.push(prod);
};

Cart.prototype.totalPrice = function(){
    
    return this.list.reduce(function(previousValue, currentValue, index, array){
        return previousValue + currentValue.price;
    },0);
};
Cart.prototype.numberOfItems = function(){
    return this.list.length;

};

Cart.prototype.mostExpensive = function(){
    var max = 0;
    for(var i=0; i<cart.list.length; i++){
        if(cart.list[i].price>max){
            max = cart.list[i].price;
            var value = cart.list[i];
        }
    }
   return value;
};

Cart.prototype.cheapest = function(){
    var min=cart.list[0].price;
    for(var i=1; i<cart.list.length; i++){
        if(cart.list[i].price<min){
            min = cart.list[i].price;
            var value = cart.list[i];
        } else {
            value = min;
        }
    }
   return value;
};

Cart.prototype.numberOf = function(item){
    var result = (cart.list).filter(function(listItem){
        
        return listItem instanceof item;  
    })
    return result.length
};

Cart.prototype.numberOf = function(min,max){
    
}