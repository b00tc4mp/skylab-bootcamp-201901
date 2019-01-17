function Socks() {
    Clothing.call(This, brand, model, size, price);
}

Socks.prototype = Object.create(Clothing.prototype)
Socks.prototype.constructor = Socks