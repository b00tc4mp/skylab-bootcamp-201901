function Mobile(brand,model,size,price) {
    Electronics.call(this,brand,model,size,price);
}

Mobile.prototype = Object.create(Electronics.prototype);
Mobile.prototype.constructor = Mobile;