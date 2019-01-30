function Shorts(brand,model, size,color,price){
    Clothing.call(this,brand,size,color,price);
    this.model = model
}

Shorts.prototype = Object.create(Clothing.prototype);
Shorts.prototype.constructor = Shorts;