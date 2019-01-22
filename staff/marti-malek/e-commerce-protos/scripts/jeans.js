function Jeans(brand, type, size, color, price) {
    Trousers.call(this, brand, type, size, color, price);

};

Jeans.prototype = Object.create(Trousers.prototype);
Jeans.prototype.constructor = Jeans;