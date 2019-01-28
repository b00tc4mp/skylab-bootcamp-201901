function Underwear(brand, size, color, price) {
    Clothing.call(this, brand, color, price);
    this.size = size;
}

Underwear.prototype = Object.create(Clothing.prototype);
Underwear.prototype.constructor = Underwear;