function Bra (brand, model, size, color, price){
    UnderWear.call(this, brand, size, price, color, model)
}

Bra.prototype = Object.create(UnderWear.prototype);
Bra.prototype.constructor = Bra;