function Electronics(brand, size, price, model) {
    this.model = model;
    Product.call(this, brand, size, price)
}

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;