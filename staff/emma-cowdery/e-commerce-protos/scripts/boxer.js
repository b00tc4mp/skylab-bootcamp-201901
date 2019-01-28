function Boxer(brand, size, color, price) {
    Underwear.call(this, brand, size, color, price);
}

Boxer.prototype = Object.create(Underwear.prototype);
Boxer.prototype.constructor = Boxer;