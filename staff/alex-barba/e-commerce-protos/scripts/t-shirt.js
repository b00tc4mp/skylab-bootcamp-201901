function TShirt(brand, size, color, price) {
    Underwear.call(this, brand, size, color, price);
};

TShirt.prototype = Object.assign(Clothing.prototype);
TShirt.prototype.constructor = TShirt;