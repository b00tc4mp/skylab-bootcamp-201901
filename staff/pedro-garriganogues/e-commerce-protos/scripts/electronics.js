function Electronics(brand, model, price){
    this.model = model;
    Product.apply(this, [brand, price]);

}

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics; 

