function Shorts(brand, model, size, price) {
    Trousers.call(this, brand, model, size, price);
}

Shorts.prototype = Object.create(Trousers.prototype)
Shorts.prototype.constructor = Shorts