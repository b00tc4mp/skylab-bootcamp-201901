function Jeans(brand, model, size, price) {
    Trousers.call(this, brand, model, size, price);
}

Jeans.prototype = Object.create(Trousers.prototype)
Jeans.prototype.constructor = Jeans