function TShirt(brand, size, color, price) {
    Clothing.apply(this, [brand, null, size, color, price]);
}

TShirt.prototype = Object.create(Clothing.prototype);
TShirt.prototype.constructor = TShirt;
