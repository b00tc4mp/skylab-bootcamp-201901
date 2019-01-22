function Sweater(brand, size, color, price) {
    Underwear.call(this, brand, size, color, price);
};

Sweater.prototype = Object.assign(Clothing.prototype);
Sweater.prototype.constructor = Sweater;