function Boxer(brand,size,color,price){
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.price = price;
};

Boxer.prototype = Object.create(Underwear.prototype);
Boxer.prototype.constructor = Boxer;