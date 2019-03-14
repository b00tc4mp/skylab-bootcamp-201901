function Sweater(brand, size, color, price) {
    this.size = size;

    Clothing.call(this, brand, color, price);
}

Sweater.prototype = Object.create(Clothing.prototype)
Sweater.prototype.constructor = Sweater