function Hat(brand, model, color, price) {
    Clothing.apply(this, [brand, model, null, color, price]);
}

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;
