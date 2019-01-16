function Mobile(brand, model, color, price) {
    Electronics.apply(this, [brand, model, color, null, price]);
}

Mobile.prototype = Object.create(Electronics.prototype)
Mobile.prototype.constructor = Mobile;

