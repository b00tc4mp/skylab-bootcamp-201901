function Trousers(price, brand, color, size, type) {
  this.type = type;
  Clothing.call(this, price, brand, color, size);
}

Trousers.prototype = Object.create(Clothing.prototype);
Trousers.prototype.constructor = Trousers;
