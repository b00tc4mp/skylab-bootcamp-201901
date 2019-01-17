function Sedan(brand, model, color, price, power, fuel, year) {
    Tourism.call(this, brand, model, '5d', color, price, power, fuel, year);
}

Sedan.prototype = Object.create(Tourism.prototype);
Sedan.prototype.constructor = Sedan;
