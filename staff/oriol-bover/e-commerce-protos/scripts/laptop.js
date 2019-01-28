function Laptop(brand, model, screenSize, price) {
    Computer.call(this, brand, model, screenSize, price);
}

Laptop.prototype = Object.create(Computer.prototype);
Laptop.prototype.constructor = Laptop;