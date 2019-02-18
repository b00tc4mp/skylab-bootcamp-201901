function Laptop(brand,model,size,price){;
    this.brand = brand;
    this.model = model;
    this.size = size;
    this.price = price;

};

Laptop.prototype = Object.create(Computer.prototype);
Laptop.prototype.constructor = Laptop;