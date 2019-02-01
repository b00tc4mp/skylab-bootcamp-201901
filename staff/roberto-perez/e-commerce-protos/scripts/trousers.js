function Trousers(brand, model, size, color, price) {
    Clothing.apply(this, [brand, model, size, color, price]);
}

Trousers.prototype = Object.create(Clothing.prototype);
Trousers.prototype.constructor = Trousers;
