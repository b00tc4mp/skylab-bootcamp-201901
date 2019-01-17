function Hat() {
    Clothing.call(This, brand, model, size, price);
}

Hat.prototype = Object.create(Clothing.prototype)
Hat.prototype.constructor = Hat