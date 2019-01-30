function Tshirt(color, brand, size, price) {
    Clothing.call(this, brand, color, size, price);
 
}

Tshirt.prototype = Object.create(Clothing.prototype);
Tshirt.prototype.constructor = Tshirt;