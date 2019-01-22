function Thong(brand, size, color, price) {
    Underwear.call(this, brand, size, color, price);
};

Thong.prototype = Object.assign(Underwear.prototype);
Thong.prototype.constructor = Thong;