function Jeans(brand,model,size,color,price){
    this.brand = brand;
    this.model = model
    this.size = size;
    this.color = color;
    this.price = price;
};

Jeans.prototype = Object.create(Trousers.prototype);
Jeans.prototype.constructor = Jeans;
