function Hat(brand, model, color, price){
    this.model = model;
    Clothing.call(this, brand, color, price);
}

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;