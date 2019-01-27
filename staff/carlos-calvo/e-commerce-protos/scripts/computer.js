function Computer(brand, size, price, model) {
    Electronics.call(this, brand, size, price, model)
}

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;