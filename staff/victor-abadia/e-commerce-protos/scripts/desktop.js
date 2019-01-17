function Desktop(){
    Computer.call(This, brand, model, size, price);
}

Desktop.prototype = Object.create(Computer.prototype);
Desktop.prototype.constructor = Desktop;