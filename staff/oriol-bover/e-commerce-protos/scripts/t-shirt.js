function TShirt(brand, size, color, price){
    this.size = size;
    Clothing.call(this, brand, color, price);
}

TShirt.prototype = Object.create(Clothing.prototype);
TShirt.prototype.constructor = TShirt;