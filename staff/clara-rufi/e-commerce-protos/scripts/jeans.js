function Jeans(brand,model, size,color,price){
    Clothing.call(this,brand,size,color,price);
    this.model = model
}

Jeans.prototype = Object.create(Clothing.prototype);
Jeans.prototype.constructor = Jeans;