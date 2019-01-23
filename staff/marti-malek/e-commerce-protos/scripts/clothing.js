function Clothing(brand, size, color, price) {
    Product.call(this,brand, price);
    this.size = size;
    this.color = color;
};

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;