function Mobile(brand, type, color, price) {
    Electronics.call(this, brand, type, price);
    this.color = color;
};

Mobile.prototype = Object.create(Electronics.prototype);
Mobile.prototype.constructor = Mobile;