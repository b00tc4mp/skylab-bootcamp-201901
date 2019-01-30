function Hat(color, brand, size, price) {
    Clothing.call(this, brand, color, size, price);
 
}

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;