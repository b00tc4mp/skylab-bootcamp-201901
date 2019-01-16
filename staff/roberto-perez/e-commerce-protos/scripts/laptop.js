function Laptop(brand, model, size, price) {
    Electronics.apply(this, [brand, model, null, size, price]);
}

Laptop.prototype = Object.create(Electronics.prototype)
Laptop.prototype.constructor = Laptop;
