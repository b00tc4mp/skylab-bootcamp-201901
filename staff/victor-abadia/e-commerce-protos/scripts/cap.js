function Cap() {
    Clothing.call(This, brand, model, size, price);
}

Cap.prototype = Object.create(Clothing.prototype)
Cap.prototype.constructor = Cap
