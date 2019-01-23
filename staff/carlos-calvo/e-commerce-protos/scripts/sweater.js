function Sweater(brand, size, color, price){
    Clothing.call(this, brand, size, price, color, undefined)
}

Sweater.prototype = Object.create(Clothing.prototype)
Sweater.prototype.constructor = Sweater