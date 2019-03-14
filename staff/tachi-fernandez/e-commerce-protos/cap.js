function Cap(brand,size,color,price){
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.price = price;
};

Cap.prototype = Object.create(Clothing.prototype);
Cap.prototype.constructor = Cap;