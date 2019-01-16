function Computer() {

}

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;