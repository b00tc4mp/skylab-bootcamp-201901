function Laptop() {
    Computer.call(This, brand, model, size, price);
}

Laptop.prototype = Object.create(Computer.prototype);
Laptop.prototype.constructor = Laptop;