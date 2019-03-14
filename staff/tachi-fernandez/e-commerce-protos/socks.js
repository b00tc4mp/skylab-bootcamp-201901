function Socks(brand,size,color,price){
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.price = price;
};

Socks.prototype = Object.create(Underwear.prototype);
Socks.prototype.constructor = Socks;