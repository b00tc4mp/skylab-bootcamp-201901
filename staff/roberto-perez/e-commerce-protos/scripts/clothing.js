function Clothing(brand, model, size, color, price) {
    Product.apply(this, [brand, model, size, color, price]);
}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;
