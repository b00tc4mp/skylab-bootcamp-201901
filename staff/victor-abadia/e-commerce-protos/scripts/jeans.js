function Jeans() {
    Throusers.call(This, brand, model, size, price);
}

Jeans.prototype = Object.create(Throusers.prototype)
Jeans.prototype.constructor = Jeans