//var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);

function Bra(brand,type,size,color,price){
    this.type=type;
    Underwear.call(this,brand,size,color,price)
}

Bra.prototype=Object.create(Underwear.prototype)
Bra.prototype.constructor= Bra