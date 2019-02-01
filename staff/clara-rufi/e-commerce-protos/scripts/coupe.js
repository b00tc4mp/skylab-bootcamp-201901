function Coupe(brand, model, color, price, power, fuel, year) {
    Tourism.call(this, brand, model, '3d', color, price, power, fuel, year);
}

Coupe.prototype = Object.create(Tourism.prototype);
Coupe.prototype.constructor = Coupe;