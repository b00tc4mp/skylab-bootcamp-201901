function Tanga() {
    Underwear.call(this, brand, model, size, price);

}

Tanga.prototype = Object.create(Underwear.prototype)
Tanga.prototype.constructor = Tanga