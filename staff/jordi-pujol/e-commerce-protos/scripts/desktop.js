function Desktop(brand, model, screen, price) {
    Computer.call(this, brand, model, screen, price);
}

Desktop.prototype = Object.create(Computer.prototype);
Desktop.prototype.constructor = Desktop;