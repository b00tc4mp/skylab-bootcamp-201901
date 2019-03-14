function Laptop(price, brand, model, screenSize) {
  Computer.call(this, price, brand, model, screenSize);
}

Laptop.prototype = Object.create(Computer.prototype);
Laptop.prototype.constructor = Laptop;
