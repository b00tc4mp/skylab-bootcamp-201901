function Clothing(brand, size, color, price) {
    Product.apply(this, [brand, size, color, price]);
}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;
