function Slips(brand, size, color, price) {
    Clothing.apply(this, [brand, size, color, price]);
}

Slips.prototype = Object.create(Clothing.prototype);
Slips.prototype.constructor = Slips;

