function Socks(brand, size, color, price) {
    Underwear.call(this, brand, color, size, price);

}

Socks.prototype = Object.create(Underwear.prototype);
Socks.prototype.constructor = Socks;