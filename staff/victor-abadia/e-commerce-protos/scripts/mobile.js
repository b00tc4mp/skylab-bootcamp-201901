function Mobile(brand, model, color, price) {
    this.color = color
    Electronics.call(this, brand, model, price);
}

Mobile.prototype = Object.create(Electronics.prototype)
Mobile.prototype.constructor = Mobile