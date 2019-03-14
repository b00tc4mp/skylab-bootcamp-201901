

function Laptop(brand, model, size, price){
    this.size = size;
    Electronics.apply(this, [brand, model, price]);
}

Laptop.prototype = Object.create(Electronics.prototype);
Laptop.prototype.constructor = Laptop;  