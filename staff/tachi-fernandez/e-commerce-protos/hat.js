function Hat(brand,size,color,price){
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.price = price;
};

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;