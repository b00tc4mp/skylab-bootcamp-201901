function Slips(price, brand, color, size) {
  Underwear.call(this, price, brand, color, size);
}

Slips.prototype = Object.create(Underwear.prototype);
Slips.prototype.constructor = Slips;
