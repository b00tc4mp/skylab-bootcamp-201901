function Slips(brand, size, color, price){
    UnderWear.call(this, brand, size, price, color, undefined)
}

Slips.prototype = Object.create(UnderWear.prototype);
Slips.prototype.constructor = Slips;
