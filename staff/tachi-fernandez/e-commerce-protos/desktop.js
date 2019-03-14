function Desktop(brand, model, size, price) {
    this.brand = brand;
    this.model = model;
    this.size = size;
    this.price = price;
}

Desktop.prototype = Object.create(Computer.prototype);
Desktop.prototype.constructor = Desktop;