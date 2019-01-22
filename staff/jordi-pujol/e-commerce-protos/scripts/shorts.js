function Shorts(brand, model, size, color, price) {
    Trousers.call(this, brand, model, size, color, price)
}

Shorts.prototype = Object.create(Trousers.prototype);
Shorts.prototype.constructor = Shorts;