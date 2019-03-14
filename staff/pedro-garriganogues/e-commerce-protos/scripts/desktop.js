var desktop = new Desktop('HP', '1800', 20, 420);

function Desktop(brand, model, size, price) {
    this.size = size;
    Electronics.apply(this, [brand, model, price]);
}

Desktop.prototype = Object.create(Computer.prototype);
Desktop.prototype.constructor = Desktop;