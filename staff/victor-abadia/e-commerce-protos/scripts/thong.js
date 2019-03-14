function Thong(brand, size, color, price) {
    Underwear.call(this, brand, size, color, price);

}

Thong.prototype = Object.create(Underwear.prototype)
Thong.prototype.constructor = Thong