function Computer(brand, model, screen, price) {
    this.screen = screen;
    Electronics.call(this, brand, model, price)
}

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;