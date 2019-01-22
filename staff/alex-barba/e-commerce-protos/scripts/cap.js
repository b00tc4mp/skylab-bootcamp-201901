function Cap(brand, size, color, price) {
    Underwear.call(this, brand, size, color, price);
};

Cap.prototype = Object.assign(Clothing.prototype);
Cap.prototype.constructor = Cap;