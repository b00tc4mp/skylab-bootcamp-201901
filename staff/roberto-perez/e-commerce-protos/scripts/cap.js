function Cap(brand, size, color, price) {
    Clothing.apply(this, [brand, size, color, price]);
}

Cap.prototype = Object.create(Clothing.prototype);
Cap.prototype.constructor = Cap;
