function Socks(brand, size, color, price){
    UnderWear.call(this, brand, size, price, color, undefined)
}

Socks.prototype = Object.create(UnderWear.prototype);
Socks.prototype.constructor = Socks;