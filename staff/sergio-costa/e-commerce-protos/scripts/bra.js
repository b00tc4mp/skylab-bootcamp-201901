function Bra(price, brand, color, size, typeBra) {
  this.typeBra = typeBra;
  Underwear.call(this, price, brand, color, size);
}

Bra.prototype = Object.create(Underwear.prototype);
Bra.prototype.constructor = Bra;
