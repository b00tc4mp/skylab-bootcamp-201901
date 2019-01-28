function Slips(brand, size, color, price) {
    Underwear.call(this, brand, size, color, price);
}

Slips.prototype = Object.create(Underwear.prototype);
Slips.prototype.constructor = Slips;