function Clothing(brand, size, color, price) {
    Product.call(this, brand, size, price);
    this.color = color;
}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;