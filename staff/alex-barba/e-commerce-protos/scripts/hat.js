function Hat(brand, type, color, price) {
    this.type = type;
    Clothing.call(this, brand, undefined, color, price);
};

Hat.prototype = Object.assign(Clothing.prototype);
Hat.prototype.constructor = Hat;