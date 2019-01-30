function Hat(price, brand, color, size, style) {
  this.style = style;
  Clothing.call(this, price, brand, color, size);
}

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;
