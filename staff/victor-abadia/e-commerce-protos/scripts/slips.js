function Slips() {

    Underwear.call(This, brand, model, size, price);

}

Slips.prototype = Object.create(Underwear.prototype)
Slips.prototype.constructor = Slips