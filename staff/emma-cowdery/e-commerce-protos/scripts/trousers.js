function Trousers(brand, type, size, color, price) {
    Clothing.call(this, brand, color, price);
    this.type = type;
    this.size = size;
}

Trousers.prototype = Object.create(Clothing.prototype);
Trousers.prototype.constructor = Trousers;