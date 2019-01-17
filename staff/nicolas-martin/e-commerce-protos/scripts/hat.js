function Hat(price, brand, color, style) {
  this.style = style;
  // Clothing.call(this, price, brand, color, undefined);
  // also we can put this like this:
  Clothing.call(this, price, brand, color, undefined);
}

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;
