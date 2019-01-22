function Slips(brand, size, color, price) {
    Underwear.call(this, brand, size, color, price);
};

Slips.prototype = Object.assign(Underwear.prototype);
Slips.prototype.constructor = Slips;