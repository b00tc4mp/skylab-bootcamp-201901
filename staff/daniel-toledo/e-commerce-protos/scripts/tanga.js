//var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);

function Tanga(brand,size,color,price){
    Underwear.call(this,brand,size,color,price)
}

Tanga.prototype=Object.create(Underwear.prototype)
Tanga.prototype.constructor= Tanga