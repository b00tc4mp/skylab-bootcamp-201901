function Tourism(brand, model, size, color, price, power, fuel, year) {
    Vehicle.call(this, brand, model, size, color, price, power, fuel, year);
}

Tourism.prototype = Object.create(Vehicle.prototype);
Tourism.prototype.constructor = Tourism;