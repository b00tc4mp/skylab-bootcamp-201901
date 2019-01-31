function Boxer(brand, size, color, price) {
    Underwear.apply(this, [brand, size, color, price]);
}

Boxer.prototype = Object.create(Underwear.prototype);
Boxer.prototype.constructor = Boxer;
