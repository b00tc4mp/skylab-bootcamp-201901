function Socks(brand, size, color, price) {
    this.size = size
    Clothing.call(this, brand, color, price);
}

Socks.prototype = Object.create(Clothing.prototype)
Socks.prototype.constructor = Socks