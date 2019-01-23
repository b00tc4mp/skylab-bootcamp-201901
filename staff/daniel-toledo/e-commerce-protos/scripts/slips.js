//var slips = new Slips('Abanderado', 42, 'purple', 13.99);

function Slips(brand,size,color,price){
    Underwear.call(this,brand,size,color,price)
}

Slips.prototype=Object.create(Underwear.prototype)
Slips.prototype.constructor= Slips