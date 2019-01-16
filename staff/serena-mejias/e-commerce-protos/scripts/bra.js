function Bra(brand,model,size,color,price){
    Underwear.call(this,brand,color,size,price);
    this.model = model;
}

Bra.prototype = Object.create(Underwear.prototype);
Bra.prototype.constructor = Bra;