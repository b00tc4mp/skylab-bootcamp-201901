function TShirt(brand, size, color, price){
    Clothing.call(this, brand, size, price, color, undefined)
}

TShirt.prototype = Object.create(Clothing.prototype)
TShirt.prototype.constructor = TShirt