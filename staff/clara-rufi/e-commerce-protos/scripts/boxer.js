function Boxer(color, brand, size, price) {
    Underwear.call(this, brand, color, size, price);
 
}

Boxer.prototype = Object.create(Underwear.prototype);
Boxer.prototype.constructor = Boxer;