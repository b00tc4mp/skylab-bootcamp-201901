function Electronics(brand, model,size, price) {
    Product.call(this, brand, size, price);
    this.model = model
}

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;