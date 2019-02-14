function Shorts(price, brand, color, size, type) {
  Trousers.call(this, price, brand, color, size, type);
}

Shorts.prototype = Object.create(Trousers.prototype);
Shorts.prototype.constructor = Shorts;
