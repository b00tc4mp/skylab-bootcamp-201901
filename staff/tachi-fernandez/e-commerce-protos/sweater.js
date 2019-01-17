function Sweater(brand,size,color,price){
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.price = price;
};

Sweater.prototype = Object.create(Clothing.prototype);
Sweater.prototype.constructor = Sweater;

