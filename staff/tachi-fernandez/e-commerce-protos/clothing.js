function Clothing(brand,size,color,price){
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.price = price;
};

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;