function Trousers (brand,model,size,color,price){
    Clothing.call(this, brand, size, price, color, model)
}

Trousers.prototype = Object.create(Clothing.prototype);
Trousers.prototype.constructor = Trousers;