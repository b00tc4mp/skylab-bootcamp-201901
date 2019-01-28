function Computer(brand, model, size, price) {
    Electronics.call(this, brand, model, price);
    this.size = size;
}

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;