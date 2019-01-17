function T-shirt() {
    Clothing.call(This, brand, model, size, price);
}

T-shirt.prototype = Object.create(Clothing.prototype)
T-shirt.prototype.constructor = T-shirt