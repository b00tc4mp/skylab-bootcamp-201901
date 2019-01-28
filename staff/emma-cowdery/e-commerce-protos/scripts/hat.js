function Hat(brand, type, color, price) {
    Clothing.call(this, brand, color, price);
    this.type = type;

}

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;