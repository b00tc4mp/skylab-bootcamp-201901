function Bra(brand, model, size, color, price) {
    this.model = model

    Underwear.call(this, brand, size, color, price);
}

Bra.prototype = Object.create(Underwear.prototype)
Bra.prototype.constructor = Bra