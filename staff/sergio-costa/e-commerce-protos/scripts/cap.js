function Cap(price, brand, color, size) {
  Clothing.call(this, price, brand, color, size);
}

Cap.prototype = Object.create(Clothing.prototype);
Cap.prototype.constructor = Cap;
