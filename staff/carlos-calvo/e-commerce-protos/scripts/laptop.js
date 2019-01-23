function Laptop(brand, model, size, price){
    Computer.call(this,brand, size, price, model)
}

Laptop.prototype = Object.create(Computer.prototype);
Laptop.prototype.constructor = Laptop;