function Desktop(brand, model, size, price) {
    Electronics.apply(this, [brand, model, null, size, price]);
}

Desktop.prototype = Object.create(Computer.prototype);
Desktop.prototype.constructor = Desktop;
