function Tanga(brand, size, color, price){
    UnderWear.call(this, brand, size, price, color, undefined)
}

Tanga.prototype = Object.create(UnderWear.prototype);
Tanga.prototype.constructor = Tanga;
