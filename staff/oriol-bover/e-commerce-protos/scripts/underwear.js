function Underwear(brand, size, color, price){
    this.size = size;  
    Clothing.call(this, brand, color, price);
}

Underwear.prototype = Object.create(Clothing.prototype);
Underwear.prototype.constructor = Underwear;