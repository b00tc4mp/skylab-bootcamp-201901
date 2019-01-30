function Jeans(brand, model, size, color, price) {
    Clothing.apply(this, [brand, model, size, color, price]);
}

Jeans.prototype = Object.create(Trousers.prototype);
Jeans.prototype.constructor = Jeans;

