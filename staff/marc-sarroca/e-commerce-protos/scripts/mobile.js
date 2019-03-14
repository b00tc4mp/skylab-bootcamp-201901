function Mobile(price, brand, model, mobileColor) {
  this.mobileColor = mobileColor;
  Electronics.call(this, price, brand, model);
}

Mobile.prototype = Object.create(Electronics.prototype);
Mobile.prototype.constructor = Mobile;
