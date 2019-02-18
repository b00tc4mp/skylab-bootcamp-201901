function Mobile(brand,model,color,price){;
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.price = price;

};

Mobile.prototype = Object.create(Electronics.prototype);
Mobile.prototype.constructor = Mobile;