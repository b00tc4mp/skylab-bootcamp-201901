function Sweater(brand, size, color, price) {
    Clothing.call(this, brand, color, price);
    this.size = size;
}

Sweater.prototype = Object.create(Clothing.prototype);
Sweater.prototype.constructor = Sweater;