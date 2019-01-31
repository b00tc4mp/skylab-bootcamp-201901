function Shorts(brand, model, size, color, price) {
    Clothing.apply(this, [brand, model, size, color, price]);
}

Shorts.prototype = Object.create(Trousers.prototype);
Shorts.prototype.constructor = Shorts;
