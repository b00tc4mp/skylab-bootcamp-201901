function Trousers(brand,size,color,price){
    Clothing.call(this,brand,size,color,price);
    
}

Trousers.prototype = Object.create(Clothing.prototype);
Trousers.prototype.constructor = Trousers;