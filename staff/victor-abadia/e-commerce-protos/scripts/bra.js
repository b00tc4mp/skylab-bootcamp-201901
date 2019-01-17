function Bra() {
    Underwear.call(This, brand, model, size, price);
}

Bra.prototype = Object.create(Underwear.prototype)
Bra.prototype.constructor = Bra