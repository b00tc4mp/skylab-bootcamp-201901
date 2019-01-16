function Tshirt(brand,size,color,price){
    Clothing.call(this,brand,size,color,price);
    
}

Tshirt.prototype = Object.create(Clothing.prototype);
Tshirt.prototype.constructor = Tshirt;