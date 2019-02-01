function Electronics(brand, model, size, color, price) {
    Product.apply(this, [brand, model, size, color, price]);
}

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;
