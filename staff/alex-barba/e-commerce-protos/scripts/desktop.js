function Desktop(brand, type, size, price) {
    Computer.call(this, brand, type, size, price)
}

Desktop.prototype = Object.create(Computer.prototype);
Desktop.prototype.constructor = Desktop;