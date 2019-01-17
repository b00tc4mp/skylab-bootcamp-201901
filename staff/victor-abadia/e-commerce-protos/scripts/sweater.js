function Sweater() {
    Clothing.call(This, brand, model, size, price);
}

Sweater.prototype = Object.create(Clothing.prototype)
Sweater.prototype.constructor = Sweater