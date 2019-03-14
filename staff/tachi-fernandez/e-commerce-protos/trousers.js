function Trousers(brand,size,color,price){
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.price = price;
};

Trousers.prototype = Object.create(Clothing.prototype);
Trousers.prototype.constructor = Trousers;
