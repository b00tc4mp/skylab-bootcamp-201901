function Hat(brand, model, color, price) {
    Clothing.call(this, brand,undefined, color, price);
    this.model = model;

};

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;