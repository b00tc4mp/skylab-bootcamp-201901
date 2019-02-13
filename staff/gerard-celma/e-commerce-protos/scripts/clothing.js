function Clothing(brand,color,price) {
    this.color = color;
    Product.call(this,brand,price);
}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;