function Trousers(brand, type, size, color, price) {
    Clothing.call(this, brand, size, color, price)
    this.type = type;
};

Trousers.prototype = Object.create(Clothing.prototype);
Trousers.prototype.constructor = Trousers;