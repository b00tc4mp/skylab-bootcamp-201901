/**
 * 
 * @param {string} brand 
 * @param {string} model 
 * @param {string} size 
 * @param {string} color 
 * @param {number} price 
 * @param {number} power 
 * @param {string} fuel 
 * @param {number} year 
 */
function Vehicle(brand, model, size, color, price, power, fuel, year) {
    Product.call(this, brand,model, size, color, price);

    this.power = power;
    this.fuel = fuel;
    this.year = year;
}

Vehicle.prototype = Object.create(Product.prototype);
Vehicle.prototype.constructor = Vehicle;