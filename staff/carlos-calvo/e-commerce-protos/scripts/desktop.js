function Desktop(brand, model, size, price) {
    Computer.call(this, brand, size, price, model)
}

Desktop.prototype = Object.create(Computer.prototype);
Desktop.prototype.constructor = Desktop;