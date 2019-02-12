function Computer(brand, model, price){
    Electronics.apply(this, [brand, model, price]);
}

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;  