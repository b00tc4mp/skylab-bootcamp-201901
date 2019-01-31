function Underwear(brand,size,color,price){
    Clothing.call(this,brand,size,color,price);
    
}

Underwear.prototype = Object.create(Clothing.prototype);
Underwear.prototype.constructor = Underwear;