function Bra(brand, type,  size, color, price) {
    this.type = type;
    Clothing.apply(this, [brand, size, color, price]);
}

Bra.prototype = Object.create(Clothing.prototype);
Bra.prototype.constructor = Bra;