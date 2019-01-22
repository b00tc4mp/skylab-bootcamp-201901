function Bra(brand,type,size,color,price) {
    Underwear.call(this, brand, size, color, price);
    this.type = type;
};

Bra.prototype = Object.create(Underwear.prototype);
Bra.prototype.constructor = Bra;