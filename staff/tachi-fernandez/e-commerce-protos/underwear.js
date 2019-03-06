function Underwear(brand,size,color,price){
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.price = price;
};

Underwear.prototype = Object.create(Clothing.prototype);
Underwear.prototype.constructor = Underwear;