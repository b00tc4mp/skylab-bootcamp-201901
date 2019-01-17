function Tanga(brand,size,color,price){
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.price = price;
};

Tanga.prototype = Object.create(Underwear.prototype);
Tanga.prototype.constructor = Tanga;