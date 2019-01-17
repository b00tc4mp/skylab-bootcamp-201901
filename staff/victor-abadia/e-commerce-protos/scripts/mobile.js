function Mobile() {
    Electronics.call(This, brand, model, size, price);
}

Mobile.prototype = Object.create(Electronics.prototype)
Mobile.prototype.constructor = Mobile