function Cap(color, brand, size, price) {
    Clothing.call(this, brand, color, size, price);
 
}

Cap.prototype = Object.create(Clothing.prototype);
Cap.prototype.constructor = Cap;