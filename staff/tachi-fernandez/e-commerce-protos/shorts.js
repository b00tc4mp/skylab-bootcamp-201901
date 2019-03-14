function Shorts(brand,model,size,color,price){
    this.brand = brand;
    this.model =model
    this.size = size;
    this.color = color;
    this.price = price;
};

Shorts.prototype = Object.create(Clothing.prototype);
Shorts.prototype.constructor = Shorts;