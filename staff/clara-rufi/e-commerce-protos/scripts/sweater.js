function Sweater(color, brand, size, price) {
    Clothing.call(this, brand, color, size, price);
 
}

Sweater.prototype = Object.create(Clothing.prototype);
Sweater.prototype.constructor = Sweater;