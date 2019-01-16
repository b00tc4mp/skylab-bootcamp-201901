function Jeans(brand,size,color,price){
    Clothing.call(this,brand,size,color,price);
    
}

Jeans.prototype = Object.create(Trousers.prototype);
Jeans.prototype.constructor = Jeans;