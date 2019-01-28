function Shorts(brand, type, size, color, price) {
    Trousers.call(this, brand, type, size, color, price);
}

Shorts.prototype = Object.create(Trousers.prototype);
Shorts.prototype.constructor = Shorts;