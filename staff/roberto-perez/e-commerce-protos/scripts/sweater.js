function Sweater(brand, size, color, price) {
    Clothing.apply(this, [brand, null, size, color, price]);
}

Sweater.prototype = Object.create(Clothing.prototype);
Sweater.prototype.constructor = Sweater;
