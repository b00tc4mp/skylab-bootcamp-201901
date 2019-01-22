function Trousers(brand, model, size, color, price) {
    this.model = model;
    this.size = size
    Clothing.call(this, brand, color, price)
}

Trousers.prototype = Object.create(Clothing.prototype);
Trousers.prototype.constructor = Trousers;