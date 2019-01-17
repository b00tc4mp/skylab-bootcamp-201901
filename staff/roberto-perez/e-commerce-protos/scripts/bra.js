function Bra(brand, type,  size, color, price) {
    this.type = type;
    Underwear.apply(this, [brand, size, color, price]);
}

Bra.prototype = Object.create(Underwear.prototype);
Bra.prototype.constructor = Bra;
