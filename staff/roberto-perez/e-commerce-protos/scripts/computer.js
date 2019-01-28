function Computer(brand, model, size, price) {
    Electronics.apply(this, [brand, model, size, null, price]);
}

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;

