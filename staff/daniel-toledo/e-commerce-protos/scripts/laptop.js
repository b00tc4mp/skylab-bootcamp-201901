function Laptop(brand,model,size,price){
    Computer.call(this,brand,model,size,price)
}

Laptop.prototype = Object.create(Computer.prototype);
Laptop.prototype.constructor = Laptop;