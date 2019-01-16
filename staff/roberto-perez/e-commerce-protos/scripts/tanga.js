function Tanga(brand, size, color, price) {
    Clothing.apply(this, [brand, size, color, price]);
}

Tanga.prototype = Object.create(Clothing.prototype);
Tanga.prototype.constructor = Tanga;

