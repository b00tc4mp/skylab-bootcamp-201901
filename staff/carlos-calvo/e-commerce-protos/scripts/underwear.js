function UnderWear(brand, size, price, color, model){
    Clothing.call(this,brand, size, price, color, model)
}

UnderWear.prototype = Object.create(Clothing.prototype);
UnderWear.prototype.constructor = UnderWear;