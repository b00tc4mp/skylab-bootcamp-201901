function Desktop(brand, model, screenSize, price) {
    Computer.call(this, brand, model, screenSize, price);
}

Desktop.prototype = Object.create(Computer.prototype);
Desktop.prototype.constructor = Desktop;