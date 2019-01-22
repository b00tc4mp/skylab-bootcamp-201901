function Laptop(brand, type, size, price) {
    Computer.call(this, brand, type, size, price);
}

Laptop.prototype = Object.create(Computer.prototype);
Laptop.prototype.constructor = Laptop;