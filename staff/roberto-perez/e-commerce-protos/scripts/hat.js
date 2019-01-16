function Hat(brand, type, color, price) {
    this.type = type;
    Clothing.apply(this, [brand, null, color, price]);
}

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;
