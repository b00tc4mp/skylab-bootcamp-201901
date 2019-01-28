function Boxer(price, brand, color, size) {
  Underwear.call(this, price, brand, color, size);
}

Boxer.prototype = Object.create(Underwear.prototype);
Boxer.prototype.constructor = Boxer;
