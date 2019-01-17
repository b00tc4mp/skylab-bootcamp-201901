function Tanga() {
    Underwear.call(This, brand, model, size, price);

}

Tanga.prototype = Object.create(Underwear.prototype)
Tanga.prototype.constructor = Tanga