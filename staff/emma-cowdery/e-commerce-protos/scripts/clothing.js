function Clothing(brand, color, price) {
    Product.call(this, brand, price);
    this.color = color;
}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;