function Socks(price, brand, color, size) {
  Underwear.call(this, price, brand, color, size);
}

Socks.prototype = Object.create(Underwear.prototype);
Socks.prototype.constructor = Socks;
