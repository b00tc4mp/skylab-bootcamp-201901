function Trousers() {
    Clothing.call(This, brand, model, size, price);
}

Tanga.prototype = Object.create(Clothing.prototype)
Tanga.prototype.constructor = Tanga