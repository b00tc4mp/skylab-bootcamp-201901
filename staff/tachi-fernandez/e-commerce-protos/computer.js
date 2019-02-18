function Computer(brand,model,size,price) {
    this.brand = brand
    this.model = model
    this.size = size
    this.price = price
}

Computer.prototype = Object.create(Electronics.prototype);
Computer.prototype.constructor = Computer;