function Tanga(brand, size, color, price) {
    Underwear.call(this, brand, size, color, price)
}

Tanga.prototype = Object.create(Underwear.prototype);
Tanga.prototype.constructor = Tanga;