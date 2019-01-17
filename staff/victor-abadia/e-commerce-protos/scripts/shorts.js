function Shorts() {
    Throusers.call(This, brand, model, size, price);
}

Shorts.prototype = Object.create(Throusers.prototype)
Shorts.prototype.constructor = Shorts