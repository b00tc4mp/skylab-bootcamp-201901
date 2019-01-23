//var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);

function Underwear(brand,size,color,price){
    this.size=size;
    Clothing.call(this,brand,color,price)
}

Underwear.prototype=Object.create(Clothing.prototype);
Underwear.prototype.constructor= Underwear