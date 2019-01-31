function Computer(price, brand, model, screenSize) {
  this.screenSize = screenSize;
  Electronics.call(this, price, brand, model, screenSize);
}

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;
