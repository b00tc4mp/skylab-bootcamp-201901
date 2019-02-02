function TShirt(brand,size,color,price){
    Clothing.call(this,brand,size,color,price);
    
}

TShirt.prototype = Object.create(Clothing.prototype);
TShirt.prototype.constructor = TShirt;