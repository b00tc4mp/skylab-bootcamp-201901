function Slips(brand,size,color,price){
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.price = price;
};

Slips.prototype = Object.create(Underwear.prototype);
Slips.prototype.constructor = Slips;