function Electronics(brand, model, price) {
    this.brand = brand;
    this.model = model;
    this.price = price;
}

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;