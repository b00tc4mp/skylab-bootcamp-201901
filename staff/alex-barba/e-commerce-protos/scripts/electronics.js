function Electronics(brand, type, price) {
    Product.call(this, brand, price)
    this.type = type;
};

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;