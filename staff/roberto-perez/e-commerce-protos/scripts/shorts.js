function Shorts(brand, type, size, color, price) {
    this.type = type;
    Clothing.apply(this, [brand, size, color, price]);
}

Shorts.prototype = Object.create(Clothing.prototype);
Shorts.prototype.constructor = Shorts;
