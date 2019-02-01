function Computer(brand, model, size, price) {
    Electronics.call(this, brand, model, size, price);

}

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;