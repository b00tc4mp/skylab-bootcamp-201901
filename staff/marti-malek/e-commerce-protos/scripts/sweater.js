function Sweater(brand, size, color, price) {
    Clothing.call(this, brand, size, color, price);

};

Sweater.prototype = Object.create(Clothing.prototype);
Sweater.prototype.constructor = Sweater;
