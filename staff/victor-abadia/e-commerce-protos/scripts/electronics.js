function Electronics() {
    brand, model, size, price) {
        this.brand = brand;
        this.model = model;
        this.size = size;
        this.price = price;
}

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;