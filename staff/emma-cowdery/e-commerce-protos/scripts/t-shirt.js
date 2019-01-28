function Tshirt(brand, size, color, price) {
    Clothing.call(this, brand, color, price);
    this.size = size;
}

Tshirt.prototype = Object.create(Clothing.prototype);
Tshirt.prototype.constructor = Tshirt;