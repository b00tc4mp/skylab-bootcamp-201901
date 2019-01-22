function Boxer(brand, size, color, price) {
    Underwear.call(this, brand, size, color, price);
};

Boxer.prototype = Object.assign(Underwear.prototype);
Boxer.prototype.constructor = Boxer;