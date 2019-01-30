function Desktop(price, brand, model, screenSize) {
  Computer.call(this, price, brand, model, screenSize);
}

Desktop.prototype = Object.create(Computer.prototype);
Desktop.prototype.constructor = Desktop;
