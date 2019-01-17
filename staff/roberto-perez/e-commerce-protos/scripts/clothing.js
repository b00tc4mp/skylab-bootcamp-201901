function Clothing(brand, size, color, price) {
    this.size = size;
    this.color = color;
    Product.apply(this, [brand, price]);
}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;
