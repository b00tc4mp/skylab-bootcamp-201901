function Trousers(model, brand, size, price) {
    Clothing.call(this, brand, size, price);
    this.model = model;
}

Trousers.prototype = Object.create(Clothing.prototype);
Trousers.prototype.constructor = Trousers;