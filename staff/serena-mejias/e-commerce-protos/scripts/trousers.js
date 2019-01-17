function Trousers(brand,model,size,color,price){
    Clothing.call(this,brand,size,color,price);
    this.model = model;
    
}

Trousers.prototype = Object.create(Clothing.prototype);
Trousers.prototype.constructor = Trousers;