function Jeans(brand, type, size, color, price) {
    this.type = type;
    Clothing.apply(this, [brand, size, color, price]);
}

Jeans.prototype = Object.create(Clothing.prototype);
Jeans.prototype.constructor = Jeans;

