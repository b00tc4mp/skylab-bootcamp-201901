function Desktop(brand, model, size, price) {
    Computer.apply(this, [brand, model, size, price]);
}

Desktop.prototype = Object.create(Computer.prototype);
Desktop.prototype.constructor = Desktop;
