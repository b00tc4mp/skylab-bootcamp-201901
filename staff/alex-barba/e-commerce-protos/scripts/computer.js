function Computer(brand, type, size, price) {
    Electronics.call(this, brand, type, price)
    this.size = size;
};

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;