


function Shorts(brand, model, size, color, price){
    this.model = model
    Clothing.apply(this, [brand, size, color, price]);

}

Shorts.prototype = Object.create(Clothing.prototype);
Shorts.prototype.constructor = Shorts;    


