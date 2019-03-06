function TShirt(brand,size,color,price){
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.price = price;
};

TShirt.prototype = Object.create(Clothing.prototype);
TShirt.prototype.constructor = TShirt;