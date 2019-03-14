function Underwear(price, brand, color, size) {
  Clothing.call(this, price, brand, color, size);
}

Underwear.prototype = Object.create(Clothing.prototype);
Underwear.prototype.constructor = Underwear;
