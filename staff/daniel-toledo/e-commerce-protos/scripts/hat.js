// var hat = new Hat('Jack & Jones', 'Cup', 'red', 44.99);

function Hat(brand, type, color, price){
    this.type=type;

    Clothing.call(this,brand, color, price)
}

Hat.prototype=Object.create(Clothing.prototype);
Hat.prototype.constructor= Hat;