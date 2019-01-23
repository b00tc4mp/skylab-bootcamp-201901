function Cap(brand, size, color, price){
    Clothing.call(this, brand, size, price, color, undefined)
}

Cap.prototype = Object.create(Clothing.prototype)
Cap.prototype.constructor = Cap