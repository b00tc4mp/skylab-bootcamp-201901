// var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199);

function Trousers(brand, type, size, color, price){
    this.size=size;
    this.type=type;

    Clothing.call(this,brand, color, price);
}

Trousers.prototype=Object.create(Clothing.prototype)
Trousers.prototype.constructor= Trousers