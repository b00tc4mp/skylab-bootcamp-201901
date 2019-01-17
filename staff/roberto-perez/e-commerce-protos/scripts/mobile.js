function Mobile(brand, model, color, price) {
    this.color = color;
    Electronics.apply(this, [brand, model, null, color, price]);
}

Mobile.prototype = Object.create(Electronics.prototype)
Mobile.prototype.constructor = Mobile;

