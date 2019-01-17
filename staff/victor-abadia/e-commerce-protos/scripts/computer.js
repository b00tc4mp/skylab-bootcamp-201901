function Computer() {
    Electronics.call(This, brand, model, size, price);
    }

    Computer.prototype = Object.create(Electronics.prototype);
    Computer.prototype.constructor = Computer;