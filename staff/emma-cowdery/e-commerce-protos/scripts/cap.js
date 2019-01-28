function Cap(brand, size, color, price) {
    Clothing.call(this, brand, color, price);
    this.size = size;
}

Cap.prototype = Object.create(Clothing.prototype);
Cap.prototype.constructor = Cap;