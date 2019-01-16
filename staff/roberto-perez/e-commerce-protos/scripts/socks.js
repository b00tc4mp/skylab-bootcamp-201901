function Socks(brand, size, color, price) {
    Clothing.apply(this, [brand, size, color, price]);
}

Socks.prototype = Object.create(Clothing.prototype);
Socks.prototype.constructor = Socks;
