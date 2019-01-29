function Cap(brand, size, color, price){
    this.size = size;
    Clothing.call(this, brand, color, price);
}

Cap.prototype = Object.create(Clothing.prototype);
Cap.prototype.constructor = Cap;