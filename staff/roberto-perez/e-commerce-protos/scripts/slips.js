function Slips(brand, size, color, price) {
    Underwear.apply(this, [brand, size, color, price]);
}

Slips.prototype = Object.create(Underwear.prototype);
Slips.prototype.constructor = Slips;
