function Jeans(price, brand, color, size, type) {
  Trousers.call(this, price, brand, color, size, type);
}

Jeans.prototype = Object.create(Trousers.prototype);
Jeans.prototype.constructor = Jeans;
