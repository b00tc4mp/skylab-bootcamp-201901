function TShirt(price, brand, color, size) {
  Clothing.call(this, price, brand, color, size);
}

TShirt.prototype = Object.create(Clothing.prototype);
TShirt.prototype.constructor = TShirt;
