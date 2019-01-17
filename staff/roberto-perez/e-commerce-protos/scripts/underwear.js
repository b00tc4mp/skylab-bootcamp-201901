function Underwear(brand, size, color, price) {
    Clothing.apply(this, [brand, null, size, color, price]);
}

Underwear.prototype = Object.create(Clothing.prototype);
Underwear.prototype.constructor = Underwear;
