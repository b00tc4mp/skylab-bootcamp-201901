function Hat(brand, model, color, price){
    Clothing.call(this, brand, undefined, price, color, model)
}

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;