function Electronics(brand, model, color, size, price) {
    this.model = model;
    Product.apply(this, [brand, size, color, price]);
}

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;
