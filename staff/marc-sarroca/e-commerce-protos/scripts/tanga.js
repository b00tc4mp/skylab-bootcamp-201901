function Tanga(price, brand, color, size) {
  Underwear.call(this, price, brand, color, size);
}

Tanga.prototype = Object.create(Underwear.prototype);
Tanga.prototype.constructor = Tanga;
