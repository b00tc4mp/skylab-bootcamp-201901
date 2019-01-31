function Slips(brand, size, color, price) {
    Underwear.call(this, brand, color, size, price);

}

Slips.prototype = Object.create(Underwear.prototype);
Slips.prototype.constructor = Slips;