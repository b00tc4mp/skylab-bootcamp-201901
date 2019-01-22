function Bra(brand, type, size, color, price) {
    this.type = type;
    Underwear.call(this, brand, size, color, price)
    
};

Bra.prototype = Object.create(Underwear.prototype);
Bra.prototype.constructor = Bra;