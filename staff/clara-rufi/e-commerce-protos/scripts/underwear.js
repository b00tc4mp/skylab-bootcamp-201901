function Underwear(brand, size, color, price) {
    Clothing.call(this, brand, color, size, price);
    
}

Underwear.prototype = Object.create(Clothing.prototype);
Underwear.prototype.constructor = Underwear;