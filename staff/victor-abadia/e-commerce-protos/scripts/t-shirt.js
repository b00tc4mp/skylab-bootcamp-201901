function Tshirt(brand, size, color, price) {
    this.size = size
    Clothing.call(this, brand, color, price);
}

Tshirt.prototype = Object.create(Clothing.prototype)
Tshirt.prototype.constructor = Tshirt