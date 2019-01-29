function Computer(brand, model, screenSize, price) {
    this.screenSize = screenSize;
    Electronics.call(this, brand, model, price);
}

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;