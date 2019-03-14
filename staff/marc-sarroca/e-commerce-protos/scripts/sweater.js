function Sweater(price, brand, color, size) {
  Clothing.call(this, price, brand, color, size);
}

Sweater.prototype = Object.create(Clothing.prototype);
Sweater.prototype.constructor = Sweater;
