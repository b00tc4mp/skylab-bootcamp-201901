function Laptop(brand,model,screen,price) {
    Computer.call(this,brand,model,screen,price);
}

Laptop.prototype = Object.create(Computer.prototype);
Laptop.prototype.constructor = Laptop;