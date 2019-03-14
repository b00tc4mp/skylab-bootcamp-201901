function Boxer() {
    Underwear.call(this, brand, model, size, price);
}

Boxer.prototype = Object.create(Underwear.prototype)
Boxer.prototype.constructor = Boxer