function Computer(brand, model, size, price) {
    this.size = size;
    Electronics.apply(this, [brand, model, price]);
}

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;

