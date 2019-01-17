function Tanga(brand, size, color, price) {
    Underwear.call(this, brand, color, size, price);

}

Underwear.prototype = Object.create(Clothing.prototype);
Tanga.prototype.constructor = Tanga;