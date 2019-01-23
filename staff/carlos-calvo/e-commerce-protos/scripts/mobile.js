function Mobile(brand, model, color, price){
    Electronics.call(this, brand, undefined, price, model)
    this.color = color
}

Mobile.prototype = Object.create(Electronics.prototype);
Mobile.prototype.constructor = Mobile;