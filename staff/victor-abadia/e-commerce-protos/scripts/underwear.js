function Underwear() {
    Clothing.call(This, brand, model, size, price);
}

Underwear.prototype = Object.create(Clothing.prototype)
Underwear.prototype.constructor = Underwear