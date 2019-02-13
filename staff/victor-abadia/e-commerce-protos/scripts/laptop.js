function Laptop(brand, model, size, price) {
    this.size = size
    Electronics.call(this, brand, model, price);
}

Laptop.prototype = Object.create(Computer.prototype);
Laptop.prototype.constructor = Laptop;